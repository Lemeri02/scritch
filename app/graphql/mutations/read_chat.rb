class Mutations::ReadChat < Mutations::BaseMutation
  argument :chat_id, ID, required: true

  field :chat, Types::ChatType, null: true
  field :errors, [String], null: false

  def resolve(arguments = {})
    chat = Chat.find(arguments[:chat_id])
    raise Pundit::NotAuthorizedError unless ChatPolicy.new(context[:current_user], chat).read?

    if chat.sender == context[:current_user]
      chat.is_sender_unread = false
    elsif chat.recipient == context[:current_user]
      chat.is_recipient_unread = false
    end

    if chat.save
      {
        chat: chat,
        errors: [],
      }
    else
      {
        chat: chat,
        errors: chat.errors.full_messages
      }
    end
  end
end
