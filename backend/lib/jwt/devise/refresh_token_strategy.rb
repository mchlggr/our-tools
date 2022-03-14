require 'jwt/devise/base_strategy'

module Jwt
  module Devise
    class RefreshTokenStrategy < BaseStrategy

      def authenticate!
        return fail!(:invalid) if resource.nil? || resource.user.nil?

        block = proc do
          resource.honor? && resource.update_columns(active: false)
        end

        if resource.user.valid_for_authentication?(&block)
          return success!(resource.user)
        end

        fail!(:invalid)
      end

      private

      def resource
        @resource ||= Token.find_by(auth_hash)
      end

      def auth_hash
        { token: refresh_token }
      end

      def refresh_token
        params[:refresh_token]
      end

      def valid_grant_type?
        grant_type == 'refresh_token'
      end

      def valid_params?
        refresh_token.present?
      end

    end
  end
end

::Warden::Strategies.add(:jwt_password, ::Jwt::Devise::RefreshTokenStrategy)