class TagReport < ApplicationRecord
  self.primary_key = :uuid

  # include PublicActivity::Model
  # tracked owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV['MODERATOR_TELEGRAM_ID']) }, recipient: Proc.new{ |_, model| model.reporter }, only: [:create]
  # has_many :activities, as: :trackable, class_name: 'PublicActivity::Activity', dependent: :destroy

  belongs_to :medium
  belongs_to :reporter, class_name: "User", optional: true
  belongs_to :assignee, class_name: "Moderator", optional: true

  has_many :moderation_comments, as: :subject, class_name: "Moderation::Comment"

  def tags
    FursuitMedium.where(uuid: self.fursuit_medium_ids)
  end
end
