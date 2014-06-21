json.array!(@tours) do |tour|
  json.extract! tour, :id, :name, :hometown, :introduction, :image, :destination_id
end
