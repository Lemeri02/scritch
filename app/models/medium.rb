class Medium < ApplicationRecord
  self.primary_key = :uuid

  extend FriendlyId
  friendly_id :title, use: :slugged

  include PublicActivity::Model
  tracked owner: Proc.new{ |_, model| User.find_by(telegram_id: ENV["MODERATOR_TELEGRAM_ID"]) }, recipient: Proc.new{ |_, model| model.user }, only: []

  acts_as_taggable

  has_many :activities, as: :trackable, class_name: 'PublicActivity::Activity', dependent: :destroy

  belongs_to :user
  belongs_to :edition, optional: true

  has_many :tag_reports, dependent: :destroy
  has_many :medium_reports, dependent: :destroy

  has_many :likes, dependent: :destroy
  has_many :likers, through: :likes, source: :user

  has_many :faves, dependent: :destroy
  has_many :favers, through: :faves, source: :user

  has_many :views, dependent: :destroy

  has_many :comments, dependent: :destroy

  belongs_to :sub_event, optional: true
  belongs_to :category, optional: true
  belongs_to :panel, optional: true

  has_many :fursuit_media, dependent: :destroy
  has_many :fursuits, through: :fursuit_media

  validates :picture, presence: true
  validates :title, presence: true

  mount_base64_uploader :picture, PictureUploader

  def get_completion
    completion = 0

    if self.category.present?
      completion += 20
    end
    if self.fursuits_count.present? && self.fursuits_count > 0
      completion += 10
      completion += (70 * (self.fursuits.count.to_f / self.fursuits_count.to_f)) # self.fursuits.count / self.fursuits_count
    end

    completion
  end
end
