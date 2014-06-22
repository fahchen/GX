class Tour < ActiveRecord::Base
  belongs_to :destination

  mount_uploader :image, ImageUploader
end
