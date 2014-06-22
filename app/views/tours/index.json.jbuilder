json.array!(@tours) do |tour|
  json.extract! tour, :id, :name, :hometown, :introduction, :destination_id
  json.image_url tour.image.url
end
