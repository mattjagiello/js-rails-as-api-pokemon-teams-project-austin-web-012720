class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers, only: [:id, :name]
    end

    def show
        trainer = Trainer.find_by(id: params[:id])
        render json: trainer.pokemons, except: [:created_at, :updated_at]
    end

    def new
    end

    def create
    end
end
