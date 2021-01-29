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
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.classList.add('list-group-item');
        button.classList.add('text-capitalize');
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
        let modalHeader = $('.modal-header');
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
        pokemonImg.classList.add('img-fluid');
        pokemonImg.classList.add('mb-2');
        pokemonImg.classList.add('pokepic');

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = 'Height: ' + pokemon.height / 10 + ' m'

        let pokemonWeight = document.createElement('p');
        pokemonWeight.innerText = 'Weight: ' + pokemon.weight / 10 + ' kg'


        modalTitle.append(pokemon.name);
        modalBody.append(pokemonId);
        modalBody.append(pokemonImg);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonWeight);
        
        pokemon.types.forEach(function(pokemon) {
            let pokemonType = document.createElement('img');
            pokemonType.classList.add('type');

            // Switch statement for Pokemon types
            switch (pokemon.type.name) {
                case 'bug':
                    pokemonType.setAttribute('src', '/img/Bug.svg');
                    break;
                case 'dark':
                    pokemonType.setAttribute('src', '/img/Dark.svg');
                    break;
                case 'dragon':
                    pokemonType.setAttribute('src', '/img/Dragon.svg');
                    break;
                case 'electric':
                    pokemonType.setAttribute('src', '/img/Electric.svg');
                    break;
                case 'fairy':
                    pokemonType.setAttribute('src', '/img/Fairy.svg');
                    break;
                case 'fight':
                    pokemonType.setAttribute('src', '/img/Fight.svg');
                    break;
                case 'fire':
                    pokemonType.setAttribute('src', '/img/Fire.svg');
                    break;
                case 'flying':
                    pokemonType.setAttribute('src', '/img/Flying.svg');
                    break;  
                case 'ghost':
                    pokemonType.setAttribute('src', '/img/Ghost.svg');
                    break;        
                case 'grass':
                    pokemonType.setAttribute('src', '/img/Grass.svg');
                    break;
                case 'ground':
                    pokemonType.setAttribute('src', '/img/Ground.svg');
                    break;
                case 'ice':
                    pokemonType.setAttribute('src', '/img/Ice.svg');
                    break;
                case 'normal':
                    pokemonType.setAttribute('src', '/img/Normal.svg');
                    break;
                case 'poison':
                    pokemonType.setAttribute('src', '/img/Poison.svg');
                    break;
                case 'psychic':
                    pokemonType.setAttribute('src', '/img/Psychic.svg');
                    break;
                case 'rock':
                    pokemonType.setAttribute('src', '/img/Rock.svg');
                    break;
                case 'steel':
                    pokemonType.setAttribute('src', '/img/Steel.svg');
                    break;
                case 'water':
                    pokemonType.setAttribute('src', '/img/Water.svg');
                    break;
            }

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
    };

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
    };

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }
    
    document.querySelector('#show-modal').addEventListener( 'click', () => {
        showModal('Modal Title', 'Modal DEETs');
    });

    window.addEventListener( 'keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener( 'click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
        hideModal: hideModal
    };
})();

// forEach() function to reach inside the pokemonRepository and write on the HTML
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
