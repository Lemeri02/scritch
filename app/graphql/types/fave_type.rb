module Types
  class FaveType < Types::BaseObject
    description "Fave object"
    field :id, ID, null: false
    field :user, UserType, null: false
    field :medium, MediumType, null: false
    field :created_at, String, null: false

    def created_at
      object.created_at.iso8601
    end
  end
end
