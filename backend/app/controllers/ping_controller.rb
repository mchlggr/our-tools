class PingController < ApplicationController
  def health_check
    render json: {healthy: true}, status: 200
  end
end
