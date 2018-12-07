class Session < ApplicationRecord
  self.primary_key = :uuid

  belongs_to :user, required: true
end
