class CreateJwtTokens < ActiveRecord::Migration[7.0]
  def change
    create_table :jwt_tokens do |t|
      t.string :token, index: true

      t.integer :user_id, index: true

      t.boolean :active, default: true, null: false

      t.timestamps
    end
  end
end
