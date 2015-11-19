class CreatePhases < ActiveRecord::Migration
  def change
    create_table :phases do |t|
      t.string :name
      t.string :content
      t.string :cost
      t.string :shortname
      t.string :department
      t.string :ptype

      t.timestamps null: false
    end
  end
end
