// Array name
let pokemonList = [];

// Pokemon listed as objects
let pokemon001 = {
    name: 'Balbasaur',
    height: 2.3,
    type: ['grass', 'poison'],
};

let pokemon002 = {
    name: 'Ivysaur',
    height: 3.25,
    type: ['grass', 'poison'],
};

let pokemon003 = {
    name: 'Venusaur',
    height: 6.58,
    type: ['grass', 'poison'],
};

let pokemon004 = {
    name: 'Charmander',
    height: 2,
    type: ['fire'],
};

let pokemon005 = {
    name: 'Charmeleon',
    height: 3.58,
    type: ['fire'],
};

let pokemon006 = {
    name: 'Charizard',
    height: 5.58,
    type: ['fire', 'flying'],
};

let pokemon007 = {
    name: 'Squirtle',
    height: 1.67,
    type: ['water'],
};

let pokemon008 = {
    name: 'Wartortle',
    height: 3.25,
    type: ['water'],
};

let pokemon009 = {
    name: 'Blastoise',
    height: 5.25,
    type: ['water'],
};

// To push each object into the array
pokemonList.push(pokemon001);
pokemonList.push(pokemon002);
pokemonList.push(pokemon003);
pokemonList.push(pokemon004);
pokemonList.push(pokemon005);
pokemonList.push(pokemon006);
pokemonList.push(pokemon007);
pokemonList.push(pokemon008);
pokemonList.push(pokemon009);

// To list out the Name and Height of each Pokemon
for (let i = 0; i < pokemonList.length; i++) {
    document.write(`${pokemonList[i].name} `);
    document.write(`(${pokemonList[i].height}) `);
    if (pokemonList[i].height > 5) {
        document.write("Wow that's tall! ");
    };
};