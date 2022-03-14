Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/health' => 'ping#health_check'

  namespace :api, :defaults => { :format => 'json' } do
    namespace :v1 do
      post :token, to: 'auths#token'

      resources :designs, only: [:index, :show]
    end
  end
end
