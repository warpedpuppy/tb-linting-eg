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

//creating a function to repeat the for loop when called upon
function printingArrayDetails(list) {
    // To list out the Name and Height of each Pokemon
    for (let i = 0; i < list.length; i++) {
        document.write(`<p> ${pokemonList[i].name}, ${pokemonList[i].height} </p>`);
        if (pokemonList[i].height > 5) {
        document.write("<p>" + "Wow that's big!" + "</p>");
        };
    };
};

printingArrayDetails(pokemonList);
