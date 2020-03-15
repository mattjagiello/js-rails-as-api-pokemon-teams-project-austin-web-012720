const BASE_URL = 'http://localhost:3000';
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

// const getTrainers = () => {
//     fetch(TRAINERS_URL)
//     .then((response) => response.json())
// }

// fetchTrainers();

function getTrainers() {
  return fetch('http://localhost:3000/trainers')
    .then((response) => response.json())
  // TODO FIGURE OUT ERROR HANDLING
    .catch((error) => console.log(error));
}

getTrainers()
  .then((trainers) => {
    trainers.forEach((trainer) => {
      const trainerCard = document.createElement('div');
      
      const addPokemonButton = document.createElement('button')
      addPokemonButton.innerHTML= 'Add Pokemon'
      addPokemonButton.addEventListener("click", function(){
        createNewPokemon(trainer.id);
      });



      trainerCard.setAttribute('class', 'card');
      trainerCard.dataset.id = trainer.id;
      const pokemonList = document.createElement('ul')
      pokemonList.setAttribute('id', `pokemon-list-${trainer.id}`)
      trainerCard.innerHTML = renderCard(trainer);
      document.querySelector('main').append(trainerCard);
      trainerCard.append(addPokemonButton);
      trainerCard.append(pokemonList);
      getPokemonByTrainerId(trainer.id)
        .then((pokemons) => {
            pokemons.forEach((pokemon) => {
                addPokemonToList(pokemon, trainer.id)
        });
        });
    });
  });

function renderCard(trainer) {
  return `<p>${trainer.name}`;
}

function addPokemonToList(pokemon) {
                let ul = document.getElementById(`pokemon-list-${pokemon.trainer_id}`)
                let delPokemonBtn = document.createElement('button');
                delPokemonBtn.setAttribute('class', 'release')
                delPokemonBtn.innerHTML= 'Release'
                delPokemonBtn.addEventListener("click", function(){
                    deletePokemon(pokemon);
                });
                let li = document.createElement ("li");
                li.setAttribute('id', pokemon.id)
                li.appendChild(document.createTextNode(`${pokemon.nickname} (${pokemon.species})`))
                li.appendChild(delPokemonBtn)
                ul.appendChild(li)
}

function getPokemonByTrainerId(id) {
  return fetch(`http://localhost:3000/trainers/${id}`)
    .then((response) => response.json());
}

async function createNewPokemon(trainerId) {
    let response = await fetch("http://localhost:3000/pokemons", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            trainer_id: trainerId
        })
    })

    if (response.ok) {
        let pokemon = await response.json();
        addPokemonToList(pokemon);
    } else {
        let resp = await response.json();
        alert(`${resp.status}: ${resp.message}`)
    }

    // }).then(pokemon => response.json()) {
    //     let ul = document.getElementById(`pokemon-list-${trainerId}`)
    //     addPokemonToList(pokemon, trainerId);
    // });
    
}

function deletePokemon(pokemon) {
    // TODO: Make sure it only removes if successful API call
    fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
        method: 'delete'
    })
    let ul = document.getElementById(`pokemon-list-${pokemon.trainer_id}`)
    let pokemonItem = document.getElementById(pokemon.id)
    ul.removeChild(pokemonItem)
}

// const postPokemon = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//     body: JSON.stringify({
//       name: infoBoxes[0].value,
//       image: infoBoxes[1].value,
//       likes: 0,
//     }),
//   };
//   fetch('http://localhost:3000/pokemons', postPokemon)
//     .then((response) => response.json())
//     .then((json) => {
//       toyList.push(json);
//       renderToyList();
//     });


// data.forEach((trainer) => {
//   const trainerCard = document.createElement('div');
//   trainerCard.setAttribute('class', 'card');
//   trainerCard.dataset.id = trainer.id;
//   trainerCard.innerHTML = renderCard(trainer);
//   document.querySelector('main').append(trainerCard);
// });
//   });
// }


// <button data-trainer-id = "${trainer.id}" > Add Pokemon </button>


// function fetchTrainers() {
//   fetch(TRAINERS_URL)
//     .then((response) => response.json())
//     .then((response) => {
//       const trainerContainer = document.querySelector('#trainer-container');
//       response.forEach((trainer) => {
//         const trainerCard = document.createElement('div');
//         const trainerName = document.createElement('p');
//         const addBtn = document.createElement('button');

//         trainerName.innerText = trainer.name;
//         trainerCard.setAttribute('class', 'card');
//         trainerCard.setAttribute('data-id', trainer.id);

//         trainerCard.append(trainerName);
//         trainerCard.append(trainerCard);

//         trainerCard.append(addBtn);
//       });
//     });
// }

// // function addPokemon(event){
// //     fetch(POKEMONS_URL), {
// //         method: "POST"
// //         headers: {
// //             'Content-Type': 'application/json'
// //             'Accept': ''
// //         }
// //     }
// // }

// // const fetchTrainers = () => fetch(TRAINERS_URL)
// //   .then((response) => response.json());


// fetch(http://localhost:3000/trainers)
// .then(response => response.json())
// .then(json => {
// console.log(json)
// })
