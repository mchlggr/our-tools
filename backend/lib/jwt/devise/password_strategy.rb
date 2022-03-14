require 'jwt/devise/base_strategy'

module Jwt
  module Devise
    class PasswordStrategy < BaseStrategy

      def authenticate!
        block = proc { resource.valid_password?(password) }

        if resource&.valid_for_authentication?(&block)
          resource.after_database_authentication
          return success!(resource)
        end

        fail!(:invalid)
      end

      private

      def resource
        @resource ||= mapping.to.find_for_database_authentication(auth_hash)
      end

      def auth_hash
        { email: email }
      end

      def email
        params[:email]
      end

      def password
        params[:password]
      end

      def valid_grant_type?
        grant_type == "password"
      end

      def valid_params?
        email.present? && password.present?
      end

    end
  end
end

::Warden::Strategies.add(:jwt_refresh_token, ::Jwt::Devise::PasswordStrategy)