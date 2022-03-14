class DesignSerializer < ApplicationSerializer
  set_type :designs
  set_id :id

  attributes :name, :document, :updated_at, :created_at

  belongs_to :user, serializer: ::UserSerializer
  belongs_to :team, serialize: ::TeamSerializer
end