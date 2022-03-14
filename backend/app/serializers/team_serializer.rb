class TeamSerializer < ApplicationSerializer
  set_type :teams
  set_id :id

  attributes :name, :created_atn

  has_many :users, serialize: ::UserSerializer

  has_many :designs, serializer: ::DesignSerializer
end