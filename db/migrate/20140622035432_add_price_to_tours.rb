class AddPriceToTours < ActiveRecord::Migration
  def change
    add_column :tours, :price, :float
  end
end
