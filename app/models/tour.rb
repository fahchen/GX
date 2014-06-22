class Tour < ActiveRecord::Base
  belongs_to :destination
  belongs_to :guide
  has_many :days

  mount_uploader :image, ImageUploader
end
