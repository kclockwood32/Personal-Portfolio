const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')

loadButton.addEventListener('click', () => {
    loadPage()
})

async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
      console.log(error)
    }
}

function loadPage() {
  getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=26`).then(
    (data) => {
        for (const singlePokemon of data.results) {
        populatePokeCard(singlePokemon)
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
  pokeCard.appendChild(populateCardFront(singlePokemon))
  pokeCard.appendChild(populateCardBack(singlePokemon))
  pokeScene.appendChild(pokeCard)
  pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
  let pokeFront = document.createElement('div')
  pokeFront.className = 'card__face card__face--front'
  let frontLabel = document.createElement('p')
  frontLabel.textContent = pokemon.name
  let frontImage = document.createElement('img')
  frontImage.src = `images/001.png`
  pokeFront.appendChild(frontImage)
  pokeFront.appendChild(frontLabel)
  return pokeFront
}

function populateCardBack(pokemon) {
  let pokeBack = document.createElement('div')
  pokeBack.className = 'card__face card__face--back'
  let backLabel = document.createElement('p')
  backLabel.textContent = 'back of card'
  pokeBack.appendChild(backLabel)
  return pokeBack
}