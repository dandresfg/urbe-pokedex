const params = (new URL(document.location)).searchParams;
const api = `https://pokeapi.co/api/v2/pokemon/${+params.get("id")}/`;

axios.get(api)
.then(res => res.data)
.then((pokemon) => {
    $('#title').innerHTML = `(#${pokemon.id}) `+ pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    $('#content').innerHTML = `
        <div class="col">
            <div class="row justify-content-center mx-2 my-2">
                <div class="card" style="width: 600px">
                    <div>
                        <img class="" src="${pokemon.sprites.front_default}" alt="Pokemon front ${pokemon}" width="150">
                        <img class="" src="${pokemon.sprites.back_default}" alt="Pokemon back ${pokemon}" width="150">
                    </div>
                    <div>
                        <img class="" src="${pokemon.sprites.front_shiny}" alt="Pokemon front ${pokemon}" width="150">
                        <img class="" src="${pokemon.sprites.back_shiny}" alt="Pokemon back ${pokemon}" width="150">
                    </div>
                    <div class="card-body">
                    
                        <div>
                            <strong>Altura: </strong><span class="mx-1">${pokemon.height}</span>
                        </div>
                        <div>
                            <strong>Peso: </strong><span class="mx-1">${pokemon.weight}</span>
                        </div>

                        <div>
                            <strong>Tipo: </strong>
                            ${pokemon.types.map(
                                (type, i, arr) => `<span class="mx-1">${type.type.name}${arr[i+1] ? ', ': ''}</span>`
                            ).join('')}
                        </div>
                        
                        <hr />
                        
                            ${pokemon.stats.map((stat) =>
                                `<div><strong>${stat.stat.name}: </strong><span class="me-2">${stat.base_stat}</span></div>`
                            ).join('')}
                            
                        <hr />

                        <div>
                            <strong>Movimientos: </strong>
                            ${pokemon.moves.map(
                                (move, i, arr) => `<span class="mx-1">${move.move.name}${arr[i+1] ? ', ': ''}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
.catch(console.log)

function $(str, parent = document){
    return parent.querySelector(str);
}