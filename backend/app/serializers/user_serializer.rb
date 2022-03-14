class UserSerializer < ApplicationSerializer
  set_type :users
  set_id :id

  attributes :email, :created_at

  belongs_to :team, serialize: ::TeamSerializer

  has_many :roles, serializer: ::RoleSerializer

  has_many :designs, serialize: ::DesignSerializer
end