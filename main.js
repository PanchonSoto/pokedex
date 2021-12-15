const poke_wrapper = document.getElementById('pokeWrapper');
const pokemon_count = 150;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

/* 
    Info
    data.name
    data.types[0].type.name

    Statsssssss
    HP:
    data.stats[0].stat.name
    data.stats[0].base_stat

    ATK: stats[1]
    DEF: stats[2]
    Speed: stats[5]
*/
const main_types = Object.keys(colors);

// funcion que ejecuta 150 veces con un for la funcion de obtener pokemon
const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i);
    }
}

//recibe el indice para usarlo como id para obtener el respectivo pokemon
const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
    //creamos el div que sera el contenedor de la card y le asignamos una clase
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('poke-container');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');

    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `
        <div class="poke-img">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="pokemon sprite">

            <div class="pokeNameInfo">
                <h2> <b>${name}</b></h2>
                <p class="no">#${id}</p>
                <span><small>Type:${pokemon.types[0].type.name}</small></span>
            </div>
        </div>

        <div class="poke-info">
            <div class="pokeStats">                
                <p class="poke-stat"><b>hp:</b></p>
                <p class="poke-stat"><b>attack:</b></p>
                <p class="poke-stat"><b>defense:</b></p>
                <p class="poke-stat"><b>speed:</b></p>   
            </div>
            <div class="pokeStats2">
                <p class="poke-stat">${pokemon.stats[0].base_stat}</p>
                <p class="poke-stat">${pokemon.stats[1].base_stat}</p>
                <p class="poke-stat">${pokemon.stats[2].base_stat}</p>
                <p class="poke-stat">${pokemon.stats[5].base_stat}</p>
            </div>
        </div>
    `;

    pokemonEl.innerHTML = pokemonInnerHTML;

    poke_wrapper.appendChild(pokemonEl);
}

fetchPokemons();