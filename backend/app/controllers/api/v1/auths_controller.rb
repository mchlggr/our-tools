require 'app_config'

class Api::V1::AuthsController < Api::V1::BaseController

  def token
     result = catch(:warden) do
          try_authenticate_user
     end

     case result
     when ::User
       render json: serialize_jwt_token(result)
     else
       render status: :unauthorized, json: { error: I18n.t(:'auth.invalid_credentials') }
     end

  end

  private

  def serialize_jwt_token(user)
    expires_in = ::AppConfig::Jwt.expiration

    {
      token_type: 'bearer',
      access_token: user.generate_jwt_token(expires_in: expires_in),
      expires_in: expires_in,
      refresh_token: generate_refresh_token_for(user)
    }
  end

  def try_authenticate_user
    warden.authenticate(:jwt_password) || warden.authenticate(:jwt_refresh_token)
  end

  def generate_refresh_token_for(user)
    jwt_token = user.jwt_tokens.create!
    jwt_token
  end
end