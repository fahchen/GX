json.array!(@destinations) do |destination|
  json.extract! destination, :id, :name
  json.url destination_url(destination, format: :json)
end
