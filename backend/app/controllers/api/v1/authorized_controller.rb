class Api::V1::AuthorizedController < Api::V1::BaseController
  # include Jwt::Decodeable

  protected

  # ---

  def current_api_user
    @current_api_user
  end

  def current_api_team
    @current_api_team
  end

  # ---

  def load_user
    @current_api_user ||= ::User.find(jwt["user_id"])
  end

  def load_team
    @current_api_team ||= ::Team.find(jwt["team_id"])
  end

  # ---

  def require_current_api_user
    raise CanCan::AccessDenied if current_api_user.nil?
  end

  def require_current_api_team
    raise CanCan::AccessDenied if current_api_team.nil?
  end

  # ---

  def jwt
    @jwt ||= Jwt.jwt_decode(bearer_token).first
    # may raise JWT::DecodeError then render 'render_unauthorized'
  end

  private

  def bearer_token
    pattern = /^Bearer /
    header = request.headers["Authorization"]
    header.gsub(pattern, '') if header.present? && header.match(pattern)
  end

end