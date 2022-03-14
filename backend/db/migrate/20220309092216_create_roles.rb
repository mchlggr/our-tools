class CreateRoles < ActiveRecord::Migration[7.0]
  def change
    # forgot to add these to previous migration
    add_column :teams, :string, :name, index: true
    add_index :designs, :name

    # ---
    create_table :roles do |t|
      t.string :name, index: true
      t.string :presentation

      t.timestamps
    end
  end
end
