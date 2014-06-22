class CreateDays < ActiveRecord::Migration
  def change
    create_table :days do |t|
      t.text :description
      t.belongs_to :tour

      t.timestamps
    end
  end
end
