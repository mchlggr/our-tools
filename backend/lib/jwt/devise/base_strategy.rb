module Jwt
  module Devise
    class BaseStrategy < ::Devise::Strategies::Authenticatable

      def valid?
        valid_grant_type? && valid_params?
      end

      protected

      def grant_type
        params[:grant_type]
      end

      def grant_type?
        params[:grant_type].present?
      end

      def valid_grant_type?
        raise ::NotImplementedError
      end

      def valid_params?
        raise ::NotImplementedError
      end

    end
  end
end