// class Pokemon {
//     constructor({name: e, sprites: a}) {
//         this.name = e,
//         this.frontImage = a.front,
//         this.backImage = a.back,
//         this.image = this.frontImage
//     }
//     render() {
//         return `
//       <div class="pokemon-container">
//         <div style='width:230px;margin:10px;background:#fecd2f;color:#2d72fc' class="pokemon-frame">
//         <h1 class="center-text">${this.name}</h1>
//         <div style="width:239px;margin:auto">
//           <div style="width:96px;margin:auto">
//             <img src="${this.image}"/>
//           </div>
//         </div>
//         <p style="padding:10px;" class="center-text flip-image" data-pokename="${this.name}" data-action="flip-image">flip card</p>
//         </div>
//       </div>
//       `
//     }
// }
//
// class PokemonLister {
//     constructor(e) {
//         this.pokemons = this.parsePokemonsJSON(e),
//         this.pokemonsToDisplay = [],
//         this.initBindingsAndEventListiners(),
//         this.render()
//     }
//     initBindingsAndEventListiners() {
//         this.pokemonsNodeContainer = document.getElementById("pokemon-container"),
//         this.searchForm = document.getElementById("pokemon-search-input"),
//         this.searchForm.addEventListener("keyup", this.findPokemons.bind(this)),
//         this.pokemonsNodeContainer.addEventListener("click", this.flipPokemonCard.bind(this))
//     }
//     parsePokemonsJSON(e) {
//         return e.map(a=>new Pokemon(a))
//     }
//     findPokemons() {
//         this.restoreFrontImages(),
//         this.pokemonsToDisplay = "" === this.searchForm.value ? [] : this.pokemons.filter(e=>e.name.includes(this.searchForm.value)),
//         this.render()
//     }
//     flipPokemonCard() {
//         if ("flip-image" === event.target.dataset.action) {
//             const e = this.pokemons.find(a=>a.name === event.target.dataset.pokename);
//             e.image === e.frontImage ? e.image = e.backImage : e.image = e.frontImage,
//             this.render()
//         }
//     }
//     restoreFrontImages() {
//         this.pokemons.map(e=>e.image = e.frontImage)
//     }
//     pokemonsHTML() {
//         return this.pokemonsToDisplay.map(e=>e.render()).join("")
//     }
//     render() {
//         this.pokemonsNodeContainer.innerHTML = `<div>${this.pokemonsHTML()}</div>`
//     }
// }
// document.addEventListener("DOMContentLoaded", function() {
//
//     async function pokemonDisplay(){
//       const result = await fetch("http://localhost:3000/pokemons");
//       const data = await result.json();
//       new PokemonLister(data)
//     }
//     pokemonDisplay()
// });
// ;

async function pokemonDisplay(){
  const result = await fetch("http://localhost:3000/pokemons");
  const data = await result.json();
  fetchCallback(data)
}
pokemonDisplay()

function fetchCallback(data){
  const searchInput = document.getElementById("pokemon-search-input");
  const pokemonArray = data

  // function flipCard(target){
  //   console.log(target)
  // }

  searchInput.addEventListener('keyup' ,event =>{
    let pokemonContainer = document.getElementById('pokemon-container')
    let container = pokemonContainer.children[0];
    container.innerHTML = '';
    if( event.target.value == "")
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
}

fetch("http://localhost:3000/pokemons").then( resp=>resp.json()).then(fetchCallback)
