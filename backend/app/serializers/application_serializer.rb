require 'jsonapi/serializer'
require 'jsonapi/serializer/instrumentation'

class ApplicationSerializer
  include JSONAPI::Serializer
  include JSONAPI::Serializer::Instrumentation

  set_key_transform :underscore
end