module Types
  class MutationType < Types::BaseObject
    field :create_session, mutation: Mutations::CreateSession
    field :create_medium, mutation: Mutations::CreateMedium
    field :create_comment, mutation: Mutations::CreateComment
    field :delete_comment, mutation: Mutations::DeleteComment
    field :create_follow, mutation: Mutations::CreateFollow
    field :delete_follow, mutation: Mutations::DeleteFollow
    field :create_like, mutation: Mutations::CreateLike
    field :delete_like, mutation: Mutations::DeleteLike
    field :delete_session, mutation: Mutations::DeleteSession
    field :delete_user, mutation: Mutations::DeleteUser
    field :update_user, mutation: Mutations::UpdateUser
    field :delete_medium, mutation: Mutations::DeleteMedium
    field :update_medium, mutation: Mutations::UpdateMedium
    field :read_activities, mutation: Mutations::ReadActivities
    field :clear_activities, mutation: Mutations::ClearActivities
    field :create_message, mutation: Mutations::CreateMessage
    field :read_chat, mutation: Mutations::ReadChat
    field :create_report, mutation: Mutations::CreateReport
  end
end
