class CreateTours < ActiveRecord::Migration
  def change
    create_table :tours do |t|
      t.string :name
      t.string :hometown
      t.text :introduction
      t.string :image
      t.belongs_to :destination

      t.timestamps
    end
  end
end
