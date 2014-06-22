class RemoveHometownAndIntroductionFromTours < ActiveRecord::Migration
  def change
    remove_column :tours, :hometown, :string
    remove_column :tours, :introduction, :text
  end
end
