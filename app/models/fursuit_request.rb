class FursuitRequest < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :user
  belongs_to :assignee, class_name: "Moderator", optional: true
  has_many :moderation_comments, as: :subject, class_name: "Moderation::Comment"

  belongs_to :fursuit_finger, optional: true
  belongs_to :fursuit_build, optional: true
  belongs_to :fursuit_padding, optional: true
  belongs_to :fursuit_style, optional: true
  belongs_to :fursuit_leg_type, optional: true
  belongs_to :fursuit_gender, optional: true

  include PublicActivity::Model
  # tracked owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV["MODERATOR_TELEGRAM_ID"]) }, recipient: Proc.new{ |_, model| model.user }
  has_many :activities, as: :trackable, class_name: 'PublicActivity::Activity', dependent: :destroy
end
