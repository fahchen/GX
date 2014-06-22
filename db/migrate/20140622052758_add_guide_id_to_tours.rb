class AddGuideIdToTours < ActiveRecord::Migration
  def change
    add_reference :tours, :guide, index: true
  end
end
