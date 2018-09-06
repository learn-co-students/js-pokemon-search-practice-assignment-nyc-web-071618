// document.addEventListener("DOMContentLoaded", function() {

const pokemonContainer = document.getElementById("pokemon-container")
const searchInput = document.getElementById("pokemon-search-input")

searchInput.addEventListener("keyup", event => displayPokemon())
pokemonContainer.addEventListener("click", clickedFlip)

function findByName(pokename){
  return pokemons.find(pokemon => pokemon.name === pokename)
}

function changeToOpposite(currImg, frontSrc, poke){
  if(frontSrc === currImg.src){
    currImg.src = poke.sprites.back
  }
  else {
    currImg.src = poke.sprites.front
  }
}

function switchImageSide(pokename){
  let poke = findByName(pokename)
  let currImg = document.getElementById(pokename + "-img")
  let frontSrc = poke.sprites.front
  changeToOpposite(currImg, frontSrc, poke)
}

function clickedFlip(){
  if(event.target.dataset.action === "flip-image"){
    // FIND THE CURR IMAGE SIDE USING THE DATASET AND THEN USE HELPER FUNCTIONS
    switchImageSide(event.target.dataset.pokename)
  }
}

function findMatchingPokemon(){
  let currInput = searchInput.value
  let toDisplay = pokemons.filter(pokemon => pokemon.name.includes(currInput))
  return toDisplay
}

function createCard(pokemon){
  pokemonContainer.innerHTML += `<div id="${pokemon.name}-container" class="pokemon-container">
            <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
            <h1 class="center-text">${pokemon.name}</h1>
            <div style="width:239px;margin:auto">
              <div style="width:96px;margin:auto">
                <img id='${pokemon.name}-img' src="${pokemon.sprites.front}">
              </div>
            </div>
            <p style="padding:10px;" class="center-text flip-image" data-side="front" data-pokename="${pokemon.name}" data-action="flip-image">flip card</p>
            </div>
          </div>`
}

function displayPokemon(){
  pokemonContainer.innerHTML = ``
  let toDisplay = findMatchingPokemon()
  toDisplay.forEach(pokemon => createCard(pokemon))
}

// })
