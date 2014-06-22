class Destination < ActiveRecord::Base
  has_many :tours

  mount_uploader :image, ImageUploader
end
