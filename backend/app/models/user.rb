class User < ApplicationRecord
  include User::Jwt

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable

  # --- General Assocations
  belongs_to :team, optional: true

  has_many :designs

  has_many :jwt_tokens

  has_and_belongs_to_many :roles, join_table: :users_roles, optional: true
end
