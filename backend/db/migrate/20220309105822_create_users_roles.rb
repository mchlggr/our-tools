class CreateUsersRoles < ActiveRecord::Migration[7.0]
  def change
    create_table :users_roles do |t|
      t.belongs_to :user
      t.belongs_to :role
    end
  end
end
