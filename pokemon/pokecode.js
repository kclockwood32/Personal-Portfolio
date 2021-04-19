// IDEA: Two different pages; First will be the Pokemon Friend Battle page. You will click the button and it will populate a random team of 6 pokemon.
// You will flip each card to see your team.
// The "hp" stat and the "attack" stat from each pokemon will be pooled together into a "team hp and atk" stat. This will display at bottom of page.
// A friend then clicks the button. They get a random team and stats at bottom. Whoever has more HP after subtracting enemy atk wins!

// IDEA 2: Random Pokemon Generator. Have lists of pre-defined things that will be randomly chosen and populated together to create a new, random pokemon.
// Perhaps use inputs from the user to generate a fun name, like their first and last name.

const pokeGrid = document.querySelector('.pokeGrid')
const teamButton = document.querySelector('.createTeam')

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

teamButton.addEventListener('click', () => {
  let pokeId = getRandomInt(1, 810)
  getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`).then(
    data => populatePokeCard(data)
  ).catch(error => console.log(error))
})

class Pokemon {
  constructor(name, height, weight, abilities, moves) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.abilities = abilities;
    this.moves = moves;
  }
}

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
  getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=6`).then(
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

let fightArray = []

function populateCardFront(pokemon) {
  let pokeFront = document.createElement('div')
  pokeFront.className = 'card__face card__face--front'
  let frontLabel = document.createElement('h2')
  frontLabel.textContent = pokemon.name
  let frontImage = document.createElement('img')
  frontImage.src = getImageFileName(pokemon)
  let frontDEF = document.createElement('p')
  frontDEF.textContent = `DEF: ${pokemon.stats[0].base_stat}`
  let frontATK = document.createElement('p')
  frontATK.textContent = `ATK: ${pokemon.stats[1].base_stat}`
  fightArray.push(pokemon.stats[1].base_stat)
  pokeFront.appendChild(frontImage)
  pokeFront.appendChild(frontLabel)
  pokeFront.appendChild(frontATK)
  pokeFront.appendChild(frontDEF)
  fightTotal(fightArray)
  return pokeFront
}

function populateCardBack(pokemon) {
  let pokeBack = document.createElement('div')
  pokeBack.className = 'card__face card__face--back'
  return pokeBack
}

function getImageFileName(pokemon) {
  let pokeId
  if (pokemon.id < 10) pokeId = `00${pokemon.id}`
  if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`
  if (pokemon.id > 99 && pokemon.id < 810) pokeId = pokemon.id
  if (pokemon.id > 811) {
    return `/images/pokeball.png`
  }

  return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`
}

function fightTotal(array) {
  if (array.length > 5)
  console.log(array)
}

//Items I need help with:
//  Detect array length, then sum total of array and output that onto screen.
//  Detect number of cards on-screen and disable button once 6 cards have been created OR
//  Detect once six cards are created and output ATK and DEF totals, then allow 6 more cards and repeat.

//  After two teams are created, take Team 1 total ATK and Team 2 total ATK. Subtract Team 1 ATK from Team 2 DEF, and vice versa.
//  Team with highest end number wins.
