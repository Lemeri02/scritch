class Like < ApplicationRecord
  self.primary_key = :uuid

  include PublicActivity::Model
  tracked owner: Proc.new{ |_, model| model.user }, recipient:  Proc.new{ |_, model| model.medium.user }

  belongs_to :user
  belongs_to :medium, counter_cache: true
end
