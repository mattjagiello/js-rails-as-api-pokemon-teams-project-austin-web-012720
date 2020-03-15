class PokemonsController < ApplicationController

    def create
        trainer_id = params[:trainer_id]
        total_pokemon = Pokemon.where(trainer_id: trainer_id)
        if total_pokemon.count < 6
            pokemon = Pokemon.create(
                nickname: Faker::Name.first_name,
                species: Faker::Games::Pokemon.name,
                trainer_id: trainer_id
            )
            render json: pokemon
        else
            render json: {status: "error", code: 412, message: "Can't have more than 6 pokemon bro"}, status: 412
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
    end
end
