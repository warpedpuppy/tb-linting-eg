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
        
    }


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

    // 
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

    // 
    function getAll() {
        return pokemonList;
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    };

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }


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
