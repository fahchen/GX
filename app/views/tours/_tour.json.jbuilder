json.extract! tour, :id, :name, :hometown, :introduction, :created_at, :updated_at, :destination_id
json.image_url tour.image.url

json.destination do
  json.partial! 'destinations/destination', destination: tour.destination
end

json.days do
  json.array! tour.days, partial: 'days/day', as: :day
end

