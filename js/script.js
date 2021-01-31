// IIFE function to not overlap global variables
let pokemonRepository = ( function () {
    // Name List
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    

    // Turns each pokemon name into a button
    function addListItem(pokemon) {
        let pokemonName = document.querySelector('.pokemon-list');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-primary', 'list-group-item', 'text-capitalize');
        button.setAttribute('type', 'button');
        button.setAttribute('data-target', '#pokemon-info');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-bs-name', 'pokemon.name');
        pokemonName.appendChild(button);
        button.addEventListener('click', function(event) {
            event.preventDefault();
            showDetails(pokemon);
        });
    }

    function showModal(pokemon) {
        // let modalHeader = $('.modal-header');
        let modalTitle = $('.modal-title');
        let modalBody = $('.modal-body');
        let modalId = $('#pokemon-id');

        modalTitle.empty();
        modalBody.empty();
        modalId.empty();

        let pokemonId = document.createElement('p');
        pokemonId.innerText = 'ID: ' + pokemon.id;

        let pokemonImg = document.createElement('img');
        pokemonImg.setAttribute('src', pokemon.imageUrl);
        pokemonImg.classList.add('img-fluid', 'mb-2', 'pokepic');

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = 'Height: ' + pokemon.height / 10 + ' m'

        let pokemonWeight = document.createElement('p');
        pokemonWeight.innerText = 'Weight: ' + pokemon.weight / 10 + ' kg'


        modalTitle.append(pokemon.name);
        modalBody.append(pokemonId);
        modalBody.append(pokemonImg);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonWeight);
        
        function convertNameToImagePath(str) {
            let capitalize = str.charAt(0).toUpperCase() + str.substr(1);
            return `/img/${capitalize}.svg`
        }

        // Shortened Switch
        pokemon.types.forEach(function(pokemon) {
            let pokemonType = document.createElement('img');
            pokemonType.classList.add('type');
            pokemonType.setAttribute('src', convertNameToImagePath(pokemon.type.name));

            modalBody.append(pokemonType);
        });
    }

    // Shows Pokemon on page
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }
    
    // Gets the pokemon list
    function getAll() {
        return pokemonList;
    }

    // adds pokemon to the list if correct
    function add(pokemon) {
        if ( typeof pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon is not correct');
        }
    }

    // loads the list from the API
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Loads detals of the pokemon
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.id =details.id;
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }
    document.getElementById('pokemon-search').addEventListener('input', searchPokemon)
    function searchPokemon() {
        let searchText = document.querySelector('#pokemon-search').value;
        let x = searchText.toLowerCase();
        let poke = document.querySelectorAll('.list-group-item');
        
        for (let i = 0; i < poke.length; i++) {
            let y = poke[i].innerText;
            if (y.toLowerCase().indexOf(x) > -1) {
                poke[i].style.display = '';
            } else {
                poke[i].style.display = 'none'
            }
        }
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
    };
})();

// forEach() function to reach inside the pokemonRepository and write on the HTML
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
