json.extract! destination, :id, :name, :created_at, :updated_at
json.image_url destination.image.try(:url)
