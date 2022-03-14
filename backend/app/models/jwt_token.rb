class JwtToken < ApplicationRecord
  attr_readonly :token

  belongs_to :user

  validates :token, presence: true

  before_validation(on: :create) { self.token ||= SecureRandom.uuid }

  scope :non_expired, -> { where("created_at >= ?", AppConfig::Jwt.refresh_token_expiration.seconds.ago) }
end