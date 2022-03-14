module Api::V1
  module ErrorRescue
    extend ActiveSupport::Concern

    included do
      # rescue_from JWT::DecodeError, :render_invalid_credentials
      # rescue_from CanCan::AccessDenied, :render_unauthorized
    end

    private

    # ---

    def render_invalid_credentials
      render status: :unauthorized, json: { error: I18n.t(:'auth.invalid_credentials') }
    end

    # ---

    def  render_unauthorized
      render status: :unauthorized, json: { error: I18n.t(:'auth.unauthorized') }
    end

  end
end