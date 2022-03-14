class CreateDesigns < ActiveRecord::Migration[7.0]
  def change
    create_table :designs do |t|
      t.belongs_to :user
      t.belongs_to :team

      t.json :document

      t.string :name

      t.timestamps
    end
  end
end
