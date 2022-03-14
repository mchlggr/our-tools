class Jwt::Preferences
  attr_reader :secret, :algorithm, :expiration, :refresh_expiration

  def initialize
    @secret ||= ENV["JWT_SECRET"]
    @algorithm ||= ENV["JWT_ALGORITHM"]
    @expiration ||= ENV["JWT_EXPIRATION"].to_i
    @refresh_expiration ||= ENV["JWT_REFRESH_EXPIRATION"].to_i
  end

end