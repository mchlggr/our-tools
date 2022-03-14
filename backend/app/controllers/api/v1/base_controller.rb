class Api::V1::BaseController < ::ApplicationController
  include Api::V1::ErrorRescue
  include Api::V1::Render
  include Api::V1::Jwt

  self.abstract!
end