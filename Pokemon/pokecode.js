// IDEA: Two different pages; First will be the Pokemon Friend Battle page. You will click the button and it will populate a random team of 6 pokemon.
// You will flip each card to see your team.
// The "hp" stat and the "attack" stat from each pokemon will be pooled together into a "team hp and atk" stat. This will display at bottom of page.
// A friend then clicks the button. They get a random team and stats at bottom. Whoever has more HP after subtracting enemy atk wins!

// IDEA 2: Random Pokemon Generator. Have lists of pre-defined things that will be randomly chosen and populated together to create a new, random pokemon.
// Perhaps use inputs from the user to generate a fun name, like their first and last name.

import { removeChildren } from "../utils/index.js";

const pokeTeam1 = document.querySelector(".pokeTeam1");
const pokeTeam2 = document.querySelector(".pokeTeam2");
const teamButton = document.querySelector(".createTeam");
const teamButton2 = document.querySelector(".createTeam2");
const team1Total = document.querySelector(".team1Total");
const team2Total = document.querySelector(".team2Total");
const battleButton = document.querySelector("#myBtn");
const result = document.querySelector(".modal-content")

let atkArray = [];
let defArray = [];
let atk2Array = [];
let def2Array = [];

let Total1ATK;
let Total1DEF;
let Total2ATK;
let Total2DEF;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

battleButton.addEventListener("click", () => {
  doBattle(Total1ATK, Total1DEF, Total2ATK, Total2DEF);
});

teamButton.addEventListener("click", () => {
  teamButton.classList.toggle((teamButton.disabled = true));
  for (let i = 0; i < 6; i++) {
    let pokeId = getRandomInt(1, 811);
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
      .then((data) => {
        populatePokeCard(data, pokeTeam1, team1Total);
      })
      .catch((error) => console.log(error));
  }
});

teamButton2.addEventListener("click", () => {
  teamButton2.classList.toggle((teamButton2.disabled = true));
  for (let i = 0; i < 6; i++) {
    let pokeId = getRandomInt(1, 811);
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
      .then((data) => {
        populatePokeCard2(data, pokeTeam2, team2Total);
      })
      .catch((error) => console.log(error));
  }
});

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
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    alert("No result found.");
  }
}

function populatePokeCard(singlePokemon, sceneContainer, totalContainer) {
  let pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  let pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () => {
    pokeCard.classList.toggle("is-flipped");
  });
  pokeCard.classList.toggle("is-flipped");
  pokeCard.appendChild(populateCardFront(singlePokemon));
  pokeCard.appendChild(populateCardBack(singlePokemon));
  pokeScene.appendChild(pokeCard);

  sceneContainer.appendChild(pokeScene);

  atkArray.push(singlePokemon.stats[1].base_stat);
  defArray.push(singlePokemon.stats[2].base_stat);

  let teamAtk = document.createElement("h2");
  teamAtk.textContent = `Attack Power: ${arrTotal(atkArray)}`;
  Total1ATK = arrTotal(atkArray);
  let teamDef = document.createElement("h2");
  teamDef.textContent = `Defense Power: ${arrTotal(defArray)}`;
  Total1DEF = arrTotal(defArray);
  console.log(sceneContainer.childNodes);
  if (sceneContainer.childNodes.length > 5) {
    totalContainer.append(teamAtk);
    totalContainer.append(teamDef);
  }
}

function populatePokeCard2(singlePokemon, sceneContainer, totalContainer) {
  let pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  let pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () => {
    pokeCard.classList.toggle("is-flipped");
  });
  pokeCard.classList.toggle("is-flipped");
  pokeCard.appendChild(populateCardFront(singlePokemon));
  pokeCard.appendChild(populateCardBack(singlePokemon));
  pokeScene.appendChild(pokeCard);

  sceneContainer.appendChild(pokeScene);

  atk2Array.push(singlePokemon.stats[1].base_stat);
  def2Array.push(singlePokemon.stats[2].base_stat);

  let teamAtk = document.createElement("h2");
  teamAtk.textContent = `Attack Power: ${arrTotal(atk2Array)}`;
  Total2ATK = arrTotal(atk2Array);
  let teamDef = document.createElement("h2");
  teamDef.textContent = `Defense Power: ${arrTotal(def2Array)}`;
  Total2DEF = arrTotal(def2Array);
  console.log(sceneContainer.childNodes);
  if (sceneContainer.childNodes.length > 5) {
    totalContainer.append(teamAtk);
    totalContainer.append(teamDef);
  }
}

function populateCardFront(pokemon) {
  let pokeFront = document.createElement("div");
  pokeFront.className = "card__face card__face--front";
  let frontLabel = document.createElement("h2");
  frontLabel.textContent = pokemon.name;
  let frontImage = document.createElement("img");
  frontImage.src = getImageFileName(pokemon);
  let frontATK = document.createElement("p");
  frontATK.textContent = `ATK: ${pokemon.stats[1].base_stat}`;

  let frontDEF = document.createElement("p");
  frontDEF.textContent = `DEF: ${pokemon.stats[2].base_stat}`;

  pokeFront.appendChild(frontImage);
  pokeFront.appendChild(frontLabel);
  pokeFront.appendChild(frontATK);
  pokeFront.appendChild(frontDEF);

  return pokeFront;
}

function populateCardBack(pokemon) {
  let pokeBack = document.createElement("div");
  pokeBack.className = "card__face card__face--back";
  return pokeBack;
}

function getImageFileName(pokemon) {
  let pokeId;
  if (pokemon.id < 10) pokeId = `00${pokemon.id}`;
  if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`;
  if (pokemon.id > 99 && pokemon.id < 810) pokeId = pokemon.id;
  if (pokemon.id > 811) {
    return `/images/pokeball.png`;
  }

  return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`;
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;

function arrTotal(array) {
  if (array.length > 5) return array.reduce(reducer);
}

function doBattle(team1TotalATK, team1TotalDEF, team2TotalATK, team2TotalDEF) {
  let result1 = team1TotalDEF - team2TotalATK;
  let result2 = team2TotalDEF - team1TotalATK;
  if (result1 > result2) result.textContent = "Team 1 Wins!";
  if (result1 < result2) result.textContent = "Team 2 Wins";
}




// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}