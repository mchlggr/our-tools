# frozen_string_literal: true

class FirstDesigns < ActiveRecord::Migration[7.0]
  def up
    mg_user = ::User.find_by(email: 'michaelgeiger@hey.com')
    design_data =  [
      {
        name: "test design 1", document: {}, user_id: mg_user.id
      },
      {
        name: "test design 2", document: {}, user_id: mg_user.id
      },
      {
        name: "test design 3", document: {}, user_id: mg_user.id
      },
      {
        name: "test design 4", document: {}, user_id: mg_user.id
      },
      {
        name: "test design 5", document: {}, user_id: mg_user.id
      }
    ]

    design_data.each do |datum|
      d = Design.find_or_initialize_by(name: datum[:name], user_id: datum[:user_id])
      d.save
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
