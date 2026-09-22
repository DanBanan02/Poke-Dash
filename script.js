const form = document.getElementById("pokemon-form");

const nameInput = document.getElementById("pokemon-name");
const typeInput = document.getElementById("pokemon-type");
const levelInput = document.getElementById("pokemon-level");

const caughtInput = document.getElementById("pokemon-caught");
const favoriteInput = document.getElementById("pokemon-favorite");

const pokemonListContainer =
    document.getElementById("pokemon-list");

const pokemonTemplate =
    document.getElementById("pokemon-template");

const pokemonFilter =
    document.getElementById("pokemon-filter");

const pokemonSort =
    document.getElementById("pokemon-sort");

const totalPokemonText =
    document.getElementById("total-pokemon");

const deleteAllButton =
    document.getElementById("delete-all-button");


const pokemonList =
    JSON.parse(localStorage.getItem("pokemonList")) || [];


/* **************************
   STATISTICS
************************** */

function updateStatistics() {

    const totalPokemon = pokemonList.reduce(function (total) {
        return total + 1;
    }, 0);

    totalPokemonText.textContent =
        "Total Pokémon: " + totalPokemon;
}


/* **************************
   FILTER POKÉMON
************************** */

function filterPokemon() {

    if (pokemonFilter.value === "caught") {

        return pokemonList.filter(function (pokemon) {
            return pokemon.caught;
        });

    }

    else if (pokemonFilter.value === "favorite") {

        return pokemonList.filter(function (pokemon) {
            return pokemon.favorite;
        });

    }

    return pokemonList;
}


/* **************************
   SORT POKÉMON
************************** */

function sortPokemon(pokemonArray) {

    let sortedPokemon = [...pokemonArray];

    if (pokemonSort.value === "name") {

        sortedPokemon.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });

    }

    else if (pokemonSort.value === "type") {

        sortedPokemon.sort(function (a, b) {
            return a.type.localeCompare(b.type);
        });

    }

    else if (pokemonSort.value === "level-low") {

        sortedPokemon.sort(function (a, b) {
            return a.level - b.level;
        });

    }

    else if (pokemonSort.value === "level-high") {

        sortedPokemon.sort(function (a, b) {
            return b.level - a.level;
        });

    }

    return sortedPokemon;
}


/* **************************
   DISPLAY POKÉMON
************************** */

function displayPokemon() {

    pokemonListContainer.innerHTML = "";

    const filteredPokemon = filterPokemon();

    const sortedPokemon =
        sortPokemon(filteredPokemon);


    sortedPokemon.map(function (pokemon) {

        const pokemonCard =
            pokemonTemplate.content.cloneNode(true);


        const {
            name,
            type,
            level,
            caught,
            favorite
        } = pokemon;


        const pokemonName =
            pokemonCard.querySelector(".pokemon-name");

        pokemonName.textContent = name;


        const pokemonType =
            pokemonCard.querySelector(".pokemon-type");

        pokemonType.textContent =
            "Type: " + type;


        const pokemonLevel =
            pokemonCard.querySelector(".pokemon-level");

        pokemonLevel.textContent =
            "Level: " + level;


        const caughtStatus =
            pokemonCard.querySelector(".caught-status");

        caughtStatus.textContent =
            caught ? "Caught: Yes" : "Caught: No";


        const favoriteStatus =
            pokemonCard.querySelector(".favorite-status");

        favoriteStatus.textContent =
            favorite ? "Favorite: Yes" : "Favorite: No";


        const deleteButton =
            pokemonCard.querySelector(".delete-button");

        const favoriteButton =
            pokemonCard.querySelector(".favorite-button");


        favoriteButton.addEventListener("click", function () {

            pokemon.favorite = !pokemon.favorite;

            localStorage.setItem(
                "pokemonList",
                JSON.stringify(pokemonList)
            );

            displayPokemon();

        });


        deleteButton.addEventListener("click", function () {

            const index =
                pokemonList.findIndex(function (item) {
                    return item.id === pokemon.id;
                });

            if (index !== -1) {
                pokemonList.splice(index, 1);
            }

            localStorage.setItem(
                "pokemonList",
                JSON.stringify(pokemonList)
            );

            displayPokemon();
            updateStatistics();

        });


        pokemonListContainer.appendChild(pokemonCard);

    });

}


/* **************************
   START PAGE
************************** */

displayPokemon();
updateStatistics();


/* **************************
   FILTER EVENT
************************** */

pokemonFilter.addEventListener("change", function () {
    displayPokemon();
});


/* **************************
   SORT EVENT
************************** */

pokemonSort.addEventListener("change", function () {
    displayPokemon();
});


/* **************************
   ADD POKÉMON
************************** */

form.addEventListener("submit", function (event) {

    event.preventDefault();


    const name = nameInput.value;
    const type = typeInput.value;

    const level =
        Number(levelInput.value);

    const caught =
        caughtInput.checked;

    const favorite =
        favoriteInput.checked;


    const pokemon = {
        id: Date.now(),
        name: name,
        type: type,
        level: level,
        caught: caught,
        favorite: favorite
    };


    pokemonList.push(pokemon);


    localStorage.setItem(
        "pokemonList",
        JSON.stringify(pokemonList)
    );


    form.reset();

    displayPokemon();
    updateStatistics();

});


/* **************************
   DELETE ALL POKÉMON
************************** */

deleteAllButton.addEventListener("click", function () {

    pokemonList.splice(
        0,
        pokemonList.length
    );

    localStorage.setItem(
        "pokemonList",
        JSON.stringify(pokemonList)
    );

    displayPokemon();
    updateStatistics();

});