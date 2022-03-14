# frozen_string_literal: true

class FirstUser < ActiveRecord::Migration[7.0]
  def up
    user_data = [
      {email: "michaelgeiger@hey.com", password:"abc123"},
      {email: "dustin@osa.io", password:"abc123"},
      {email: "justin@osa.io", password:"abc123"},
      {email: "ryan@osa.io", password:"abc123"}
    ]

    user_data.each do |datum|
      u = ::User.find_or_initialize_by(email: datum[:email])
      u.password = datum[:password]
      u.save
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
