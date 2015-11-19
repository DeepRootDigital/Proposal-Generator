class PhasesController < ApplicationController
  respond_to :json

  def index
    phases = Phase.all
    render json: phases, status: 200
  end

  def create
    phase = Phase.new(phase_params)
    if phase.save
      render json: phase, status: 200
    else
      render root_url
    end
  end

  private

    def phase_params
      params.require(:phase).permit(:name, :content, :cost, :shortname, :department, :ptype)
    end

end
