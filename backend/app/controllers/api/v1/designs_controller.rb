class Api::V1::DesignsController < Api::V1::AuthorizedController

  def index
    render_serialized_payload { serialize_collection(collection) }
  end

  def show
    render_serialized_payload { serialize_resource(resource) }
  end

  protected

  def serializer
    ::DesignSerializer
  end

  private

  def collection
    ::Design.all
  end

end