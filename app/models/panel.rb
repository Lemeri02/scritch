class Panel < ApplicationRecord
  self.primary_key = :uuid

  has_many :media
end
