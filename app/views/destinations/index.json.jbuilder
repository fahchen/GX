json.array!(@destinations) do |destination|
  json.extract! destination, :id, :name
end
