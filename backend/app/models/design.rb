class Design < ApplicationRecord

  validates :name, :user, presence: true

  belongs_to :user
  belongs_to :team, optional: true

end