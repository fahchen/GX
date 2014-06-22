json.array!(@days) do |day|
  json.extract! day, :id, :description
  json.url day_url(day, format: :json)
end
