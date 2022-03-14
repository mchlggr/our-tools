# require 'jwt'

require 'jwt/devise/password_strategy'
require 'jwt/devise/refresh_token_strategy'

require 'jwt/decodeable'
require 'jwt/encodeable'

module Jwt
  extend Jwt::Decodeable
  extend Jwt::Encodeable
end
