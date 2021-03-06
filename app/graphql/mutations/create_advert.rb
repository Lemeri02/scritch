class Mutations::CreateAdvert < Mutations::BaseMutation
  argument :file, String, required: true
  argument :url, String, required: true

  field :advert, Types::AdvertType, null: true
  field :errors, [String], null: false

  def resolve(arguments)
    advert = Advert.new(arguments)
    advert.user = context[:current_user]
    advert.url = "http://#{arguments[:url].split("://").last}"
    #raise Pundit::NotAuthorizedError unless AdvertPolicy.new(context[:current_user], advert).create?

    if advert.save
      {
        advert: advert,
        errors: [],
      }
    else
      {
        advert: nil,
        errors: advert.errors.full_messages
      }
    end
  end
end
