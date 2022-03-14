module Jwt::Decodeable
  def jwt_decode(jwt_token)
    ::JWT.decode(jwt_token, AppConfig::Jwt.secret, AppConfig::Jwt.algorithm)
  end
end