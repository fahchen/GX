json.extract! guide, :id, :name, :hometown, :introduction, :created_at, :updated_at
json.image_url guide.image.try(:url)

