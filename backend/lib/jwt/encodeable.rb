module Jwt::Encodeable
  def jwt_encode(payload:, expires_in: nil)
    jwt_payload = payload.dup.with_indifferent_access

    current_time = Time.current.to_i

    jwt_payload[:exp] ||= current_time + expires_in.to_i if expires_in.present?
    jwt_payload[:iat] ||= current_time
    jwt_payload[:iss] ||= ENV["APP_NAME"] || Rails.application.name

    ::JWT.encode(jwt_payload, ::AppConfig::Jwt.secret, ::AppConfig::Jwt.algorithm)
  end
end