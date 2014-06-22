json.extract! tour, :id, :name, :created_at, :updated_at, :destination_id, :price
json.image_url tour.image.try(:url)

json.destination do
  json.partial! 'destinations/destination', destination: tour.destination
end

json.days do
  json.array! tour.days, partial: 'days/day', as: :day
end

json.guide do
  if tour.guide
    json.partial! 'guides/guide', guide: tour.guide
  else
    json.null!
  end
end

