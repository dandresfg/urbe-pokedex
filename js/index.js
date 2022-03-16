const api = `https://pokeapi.co/api/v2/pokemon?limit=2000`;
const pokemons = {};

axios.get(api)
.then(res => Promise.all(res.data.results.map((pokemon) => axios.get(pokemon.url))))
.then(res => {
    for(const poke of res){
        pokemons[poke.data.name] = poke.data;
    }
})
.then(() => {
    $('#content').innerHTML = Object.keys(pokemons).map(key => {
        const pokemon = pokemons[key];
        return `
         <div class="col">
            <div class="row justify-content-center mx-2 my-2">
                <a href="/pokemon/?id=${pokemon.id}" class="card" style="width: 200px; position: relative; text-decoration: none; color: black">
                    <img class="card-img-top" src="${pokemon.sprites.front_default}" alt="Pokemon ${key}">
                    <div class="card-body"><h5 class="card-title">${key}</h5></div>
                    <span style="position: absolute; font-size: 26;"><strong>#${pokemon.id}</strong></span>
                </a>
            </div>
        </div>`
    }).join('')
})
.catch(console.log)

function $(str, parent = document){
    return parent.querySelector(str);
}