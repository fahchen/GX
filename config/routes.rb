Rails.application.routes.draw do
  resources :guides

  resources :days

  resources :tours

  resources :destinations
end
