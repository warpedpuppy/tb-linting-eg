// IIFE function to not overlap global variables
let pokemonRepository = ( function () {
    // Array name
    let pokemonList = [
        // Pokemon listed as objects
        { name: 'Balbasaur', height: 2.3, type: ['grass', 'poison'] },
        { name: 'Ivysaur', height: 3.25, type: ['grass', 'poison'] },
        { name: 'Venusaur', height: 6.58, type: ['grass', 'poison'] },
        { name: 'Charmander', height: 2, type: ['fire'] },
        { name: 'Charmeleon', height: 3.58, type: ['fire'] },
        { name: 'Charizard', height: 5.58, type: ['fire', 'flying'] },
        { name: 'Squirtle', height: 1.67, type: ['water'] },
        { name: 'Wartortle', height: 3.25, type: ['water'] },
        { name: 'Blastoise', height: 5.25, type: ['water'] },
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'height' in pokemon &&
            'types' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon is not correct');
        }
    }

    function addListItem(pokemon) {
        let pokemonName = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonName.appendChild(listItem);
        button.addEventListener('click', function(pokemon) {
            showDetails(pokemon);
        });
    }

    function showDetails() {
        console.log(pokemonList.name);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();

// forEach() function to reach inside the pokemonRepository and write on the HTML
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});

