module Api::V1
  module Render
    extend ActiveSupport::Concern

    protected

    # ---

    def serialize_collection(collection)
      collection_serializer.new(collection,
                                include: param_includes,
                                fields: param_fields
      ).serializable_hash
    end

    def serialize_resource(resource)
      return ActiveRecord::RecordNotFound if resource.nil?
      resource_serializer.new(resource,
                              include: param_includes,
                              fields: param_fields
      ).serializable_hash
    end

    # ---

    def render_serialized_payload(status = 200)
      json = yield
      render json: json, status: status, content_type: content_type
    rescue ArgumentError => exception
      render_error_payload(exception.message, 400)
    end

    def render_error_payload(error, status = 200)
      render json: { error: error.try(:to_s), errors: errors.try(:to_h) },
             status: status,
             content_type: content_type
    end

    # ---

    # Default content type
    def content_type
      'application/vnd.api+json'
    end

    # ---

    def collection_serializer
      serializer
    end

    def resource_serializer
      serializer
    end

    # ---

    def param_includes
      return [] unless params.dig(:include).present?

      params[:include].split(',').flatten
    end

    def param_fields
      return {} unless params.dig(:fields)&.respond_to?(:each)

      fields = {}

      params.dig(:fields).each do |type, v|
        if v.is_a?(String)
          values = values
        elsif v.is_a?(Array)
          values = values.join(',')
        end

        fields[type.intern] = values.split(',').map(&:intern)
      end

      fields.presence
    end

  end
end