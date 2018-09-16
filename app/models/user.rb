class User < ApplicationRecord
  self.primary_key = :uuid

  extend FriendlyId
  friendly_id :name, use: :slugged

  has_one_attached :avatar
  has_many :media
  has_many :published_media, -> { joins(:video_encoding_job).where("chronofage_jobs.completed_at IS NOT NULL AND chronofage_jobs.failed_at IS NULL") }, class_name: "Medium"
end
