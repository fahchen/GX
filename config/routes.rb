Rails.application.routes.draw do
  resources :days

  resources :tours

  resources :destinations
end
