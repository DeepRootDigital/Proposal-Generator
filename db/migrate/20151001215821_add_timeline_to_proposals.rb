class AddTimelineToProposals < ActiveRecord::Migration
  def change
    add_column :proposals, :timeline, :text
  end
end
