const pokeGrid = document.querySelector('.pokeGrid')
const fetchButton = document.querySelector('.fetchPokemonByID')
const newButton = document.querySelector('.createPokemon')

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

fetchButton.addEventListener('click', () => {
  let pokeId = prompt("Pokemon ID or Name").toLowerCase()
  getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`).then(
    data => populatePokeCard(data)
  ).catch(error => console.log(error))
})

class Pokemon {
  constructor(name, height, weight, personality) {
    this.id = 900;
    this.name = `${name}mon`;
    this.height = height;
    this.weight = weight;
    this.personality = personality;
  }
}

newButton.addEventListener('click', () => {
  let pokeName = prompt("What is the name of your new Pokemon?")
  let pokeHeight = `${getRandomInt(1, 40)} ft`
  let pokeWeight = `${getRandomInt(1, 300)} lbs`
  let newPokemon = new Pokemon(
    pokeName, 
    pokeHeight, 
    pokeWeight,
    ['Funny', 'Lazy', 'Smart', 'Mischevious', 'Quiet', 'Lovable', 'Nervous', 'Tricksy ', 'Awkward', 'Tough-guy', 'Care-free', 'Silly', 'Cunning', 'Sexy', 'Ignorant', 'Selfish', 'Charitable', 'Curious']
  )
  populatePokeCardAlt(newPokemon)
})

async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
      console.log(error)
      alert('No result found.')
    }
}

function loadPage() {
  getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=25`).then(
    async (data) => {
        for (const singlePokemon of data.results) {
          await getAPIData(singlePokemon.url).then(
            (pokeData) => populatePokeCard(pokeData)
          )
        }
    }
  )
}

function populatePokeCard(singlePokemon) {
  let pokeScene = document.createElement('div')
  pokeScene.className = 'scene'
  let pokeCard = document.createElement('div')
  pokeCard.className = 'card'
  pokeCard.addEventListener('click', () => {
    pokeCard.classList.toggle('is-flipped')
  })
  pokeCard.classList.toggle('is-flipped')
  pokeCard.appendChild(populateCardFront(singlePokemon))
  pokeCard.appendChild(populateCardBack(singlePokemon))
  pokeScene.appendChild(pokeCard)
  pokeGrid.appendChild(pokeScene)
}


function populateCardFront(pokemon) {
  let pokeFront = document.createElement('div')
  pokeFront.className = 'card__face card__face--front'
  let frontLabel = document.createElement('h2')
  frontLabel.textContent = pokemon.name
  let frontImage = document.createElement('img')
  frontImage.src = getImageFileName(pokemon)
  let frontHP = document.createElement('p')
  frontHP.textContent = `HP: ${pokemon.stats[0].base_stat}`
  let frontATK = document.createElement('p')
  frontATK.textContent = `ATK: ${pokemon.stats[1].base_stat}`
  let frontDEF = document.createElement('p')
  frontDEF.textContent = `DEF: ${pokemon.stats[2].base_stat}`
  pokeFront.appendChild(frontImage)
  pokeFront.appendChild(frontLabel)
  pokeFront.appendChild(frontHP)
  pokeFront.appendChild(frontATK)
  pokeFront.appendChild(frontDEF)
  return pokeFront
}



function populateCardBack(pokemon) {
  let pokeBack = document.createElement('div')
  pokeBack.className = 'card__face card__face--back'
  return pokeBack
}


function populatePokeCardAlt(singlePokemon) {
  let pokeScene = document.createElement('div')
  pokeScene.className = 'scene'
  let pokeCard = document.createElement('div')
  pokeCard.className = 'card'
  pokeCard.addEventListener('click', () => {
    pokeCard.classList.toggle('is-flipped')
  })
  pokeCard.classList.toggle('is-flipped')
  pokeCard.appendChild(populateCardFrontAlt(singlePokemon))
  pokeCard.appendChild(populateCardBack(singlePokemon))
  pokeScene.appendChild(pokeCard)
  pokeGrid.appendChild(pokeScene)
}

function populateCardFrontAlt(pokemon) {
  let pokeFront = document.createElement('div')
  pokeFront.className = 'card__face card__face--front'
  let frontLabel = document.createElement('h2')
  frontLabel.textContent = pokemon.name
  let frontImage = document.createElement('img')
  frontImage.src = getImageFileName(pokemon)
  let frontHeight = document.createElement('p')
  frontHeight.textContent = `Height: ${pokemon.height}`
  let frontWeight = document.createElement('p')
  frontWeight.textContent = `Weight: ${pokemon.weight}`
  let personalityTitle = document.createElement('p')
  personalityTitle.textContent = `Personality:`
  let personalityType = document.createElement('p')
  personalityType.textContent = pokemon.personality[getRandomInt(0, 18)]
  pokeFront.appendChild(frontImage)
  pokeFront.appendChild(frontLabel)
  pokeFront.appendChild(frontHeight)
  pokeFront.appendChild(frontWeight)
  pokeFront.appendChild(personalityTitle)
  pokeFront.appendChild(personalityType)
  return pokeFront
}

function getImageFileName(pokemon) {
  let pokeId
  if (pokemon.id < 10) pokeId = `00${pokemon.id}`
  if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`
  if (pokemon.id > 99 && pokemon.id < 810) pokeId = pokemon.id
  if (pokemon.id > 811) {
    return `images/${getRandomInt(1, 17)}.png`
    // return `images/${getRandomInt(1, 16)}.png;`
  }

  return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`
}