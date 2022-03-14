class RoleSerializer < ApplicationSerializer
  set_type :roles
  set_id :id

  attributes :name, :presentation

  has_many :users, serializer: ::UserSerializer
end