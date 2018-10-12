module Types
  class QueryType < Types::BaseObject
    field :medium, MediumType, null: false do
      description "Find a medium by ID"
      argument :id, ID, required: true
    end

    field :media, [MediumType], null: false do
      description "List media"
      argument :q, String, required: false
      argument :sort, String, required: false
      argument :user_id, ID, required: false
      argument :page, Integer, required: true
      argument :per, Integer, required: true
    end

    field :activities, [ActivityType], null: false do
      description "Activities"
      argument :page, Integer, required: true
      argument :per, Integer, required: true
    end

    field :likes_by_user, [LikeType], null: false do
      description "List likes by user"
      argument :user_id, ID, required: true
      argument :page, Integer, required: true
      argument :per, Integer, required: true
    end

    field :followers_by_user, [UserType], null: false do
      description "List followers by user"
      argument :user_id, ID, required: true
      argument :page, Integer, required: true
      argument :per, Integer, required: true
    end

    field :followings_by_user, [UserType], null: false do
      description "List followings by user"
      argument :user_id, ID, required: true
      argument :page, Integer, required: true
      argument :per, Integer, required: true
    end

    field :comments_by_medium, [CommentType], null: false do
      description "List comments by medium"
      argument :medium_id, ID, required: true
      argument :parent_id, ID, required: false
      argument :page, Integer, required: true
      argument :per, Integer, required: true
    end

    field :user, UserType, null: false do
      description "Find a user by ID"
      argument :id, ID, required: true
    end

    field :session, SessionType, null: true do
      description "Find current session"
    end

    field :unread_activity_count, Integer, null: false do
      description "Get the number of unread activities"
    end

    def medium(arguments = {})
      View.add(arguments[:id], context[:current_user_references])

      Medium.includes(comments: [:user]).find(arguments[:id])
    end

    def media(arguments = {})
      media = Medium.published.includes(:user)

      if arguments[:q].present?
        media = media.where("media.title @@ ? OR media.uuid IN (?)", arguments[:q], Medium.tagged_with(arguments[:q]).select(:uuid))
      end

      media =
        case arguments[:sort]
        when 'latest'
          media.order(created_at: :desc)
        when 'trending'
          media.order(["media.likes_count", created_at: :desc])
        when 'subscriptions'
          media.where(user: context[:current_user].all_following).order(created_at: :desc)
        else
          media
        end

      if arguments[:user_id].present?
        media = media.where(user_id: arguments[:user_id])
      end

      media.includes(:taggings).page(arguments[:page]).per(arguments[:per])
    end

    def activities(arguments = {})
      Activity
        .where(recipient: context[:current_user])
        .order(created_at: :desc)
        .page(arguments[:page]).per(arguments[:per])
        .includes(:owner, :recipient, :trackable)
    end

    def likes_by_user(arguments = {})
      Like.where(user_id: arguments[:user_id]).order(created_at: :desc).page(arguments[:page]).per(arguments[:per])
    end

    def followers_by_user(arguments = {})
      User.find(arguments[:user_id]).followers
    end

    def followings_by_user(arguments = {})
      User.find(arguments[:user_id]).all_following
    end

    def comments_by_medium(arguments = {})
      Comment.where(medium_id: arguments[:medium_id]).order(created_at: :desc).page(arguments[:page]).per(arguments[:per])
    end

    def user(arguments = {})
      User.find(arguments[:id])
    end

    def session(arguments = {})
      context[:current_session]
    end

    def unread_activity_count
      Activity.where(recipient: context[:current_user]).where("activities.created_at > ?", context[:current_user].last_activities_read).count
    end
  end
end
