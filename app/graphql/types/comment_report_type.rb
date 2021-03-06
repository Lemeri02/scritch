module Types
  class CommentReportType < Types::BaseObject
    description "CommentReport object"
    field :id, ID, null: false
    field :description, String, null: false
    field :comment, CommentType, null: false
    field :reporter, UserType, null: false

    field :reported_comment_user_name, String, null: true

    def reported_comment_user_name
      object.comment&.user.name
    end
  end
end
