json.extract! @tour, :id, :name, :hometown, :introduction, :destination_id, :created_at, :updated_at
json.image_url @tour.image.url
