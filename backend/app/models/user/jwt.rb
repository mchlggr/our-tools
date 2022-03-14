require 'jwt/encodeable'

class User < ApplicationRecord
  module Jwt
    extend ActiveSupport::Concern

    included do
      include ::Jwt::Encodeable
    end

    def generate_jwt_token(expires_in: nil)
      jwt_encode(payload: serialize_jwt_payload, expires_in: expires_in)
    end

    def serialize_jwt_payload
      {
        sub: id, # Short for subject, is part of offical JWT spec
        user_id: self.id,
        email: self.email,
        team_id: self.team_id
      }
    end

  end
end