class Guide < ActiveRecord::Base
  mount_uploader :image, ImageUploader
end
