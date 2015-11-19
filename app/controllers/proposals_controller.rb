class ProposalsController < ApplicationController
  respond_to :json

  def index
    @proposals = Proposal.all.paginate(page: params[:page])
  end

  def new
    @proposal = Proposal.new
    @phases = Phase.all
    @phase = Phase.new
  end

  def create
    proposal = Proposal.new(proposal_params)
    if proposal.save
      redirect_to proposals_url
    else
      render root_url
    end
  end

  def show
    if params['id']
      @proposal = Proposal.find(params['id'])
      @phases = []
      @proposal.propinfo.split(",").each do |p|
        @phases << Phase.find(p.to_i)
      end
      @timeline = JSON.parse(@proposal.timeline)
    end
    render pdf: "file_name",
           template: 'proposals/show.pdf.erb',
           margin: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
           }
  end

  private

    def proposal_params
      params.require(:proposal).permit(:name, :propinfo, :timeline)
    end

end
