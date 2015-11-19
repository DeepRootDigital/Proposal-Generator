class ChangeContentFromStringToText < ActiveRecord::Migration
  def change
    change_column :phases, :content, :text
  end
end
