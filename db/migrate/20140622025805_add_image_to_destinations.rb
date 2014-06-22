class AddImageToDestinations < ActiveRecord::Migration
  def change
    add_column :destinations, :image, :string
  end
end
