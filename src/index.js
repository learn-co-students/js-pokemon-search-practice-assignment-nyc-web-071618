const searchInput = document.getElementById("pokemon-search-input");
const pokemonArray = data.pokemons

// function flipCard(target){
//   console.log(target)
// }

searchInput.addEventListener('keyup' ,event =>{
  let pokemonContainer = document.getElementById('pokemon-container')
  let container = pokemonContainer.children[0];
  container.innerHTML = '';
  if( event.target.value == "" )
    return
  pokemonArray.forEach(pokemon=>{
    if( pokemon.name.startsWith(event.target.value)){
      container.innerHTML += `<div class="pokemon-container">
        <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
        <h1 class="center-text">${pokemon.name}</h1>
        <div style="width:239px;margin:auto">
          <div style="width:96px;margin:auto">
            <img id='${pokemon.name}' src="${pokemon.sprites.front}">
          </div>
        </div>
        <p style="padding:10px;" class="center-text flip-image" data-pokename="${pokemon.name}" data-action="flip-image">flip card</p>
        </div>
      </div>`
      }
  })
  let para = document.getElementsByClassName(`flip-image`);
  for(let i = 0; i<para.length; i++){
    para[i].addEventListener('click', e=>{
      let pokemonName = document.getElementById(e.target.dataset.pokename)
      let poke = pokemonArray.find(pokemon => pokemon.name === pokemonName.id)
      pokemonName.src =  pokemonName.src === poke.sprites.front ? poke.sprites.back : poke.sprites.front
      // for(let j = 0; j<pokemonArray.length; j++){
      //   let pokeItem = pokemonArray[j]
      //   if( pokeItem.name == e.target.dataset.pokename){
      //     pokemonImg.src = pokemonImg.src == pokeItem.sprites.front ? pokeItem.sprites.back : pokeItem.sprites.front
      //     break;
      //   }
      // }
    })

  }
})
