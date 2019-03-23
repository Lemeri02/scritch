module Types
  class TagReportType < Types::BaseObject
    description "TagReport object"
    field :id, ID, null: false
    field :reported_tag_picture_title, String, null: true

    def reported_tag_picture_title
      object.medium&.title
    end
  end
end
