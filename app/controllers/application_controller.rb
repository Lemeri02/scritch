class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_csrf_token, if: :valid_request_origin?

  before_action :initialize_meta

  def index
  end
  layout :layout_by_resource

    private

    def layout_by_resource
      if devise_controller?
        "moderation"
      else
        "application"
      end
    end
  protected

  def initialize_meta
    @meta = {}
  end

  def set_csrf_token
    cookies["csrf-token"] = {
      value: form_authenticity_token,
      httponly: true
    }
  end
end
