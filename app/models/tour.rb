class Tour < ActiveRecord::Base
  belongs_to :destination
  has_many :days

  mount_uploader :image, ImageUploader
end
