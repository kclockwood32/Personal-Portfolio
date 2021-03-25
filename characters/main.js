import { people } from '../data/people.js'
import { removeChildren, getLastNumber } from '../utils/index.js'

const mainContent = document.querySelector('#main')

const mainHeader = document.createElement('header')

document.body.insertBefore(mainHeader, mainContent)

const maleButton = document.createElement('button')
maleButton.textContent = 'Male Characters'
maleButton.addEventListener('click', () => populateDOM(maleCharacters))
mainHeader.appendChild(maleButton)

const femaleButton = document.createElement('button')
femaleButton.textContent = 'Female Characters'
femaleButton.addEventListener('click', () => populateDOM(femaleCharacters))
mainHeader.appendChild(femaleButton)

const otherButton = document.createElement('button')
otherButton.textContent = 'Other Characters'
otherButton.addEventListener('click', () => populateDOM(otherCharacters))
mainHeader.appendChild(otherButton)

const heavyButton = document.createElement('button')
heavyButton.textContent = 'Heavy Characters'
heavyButton.addEventListener('click', () => populateDOM(heavyCharacters))
mainHeader.appendChild(heavyButton)

const lightButton = document.createElement('button')
lightButton.textContent = 'Light Characters'
lightButton.addEventListener('click', () => populateDOM(lightCharacters))
mainHeader.appendChild(lightButton)



const maleCharacters = people.filter(person => person.gender === 'male')
const femaleCharacters = people.filter(person => person.gender === 'female')
const otherCharacters = people.filter(person => {
    if (person.gender === 'n/a' || person.gender === 'none' || person.gender === 'hermaphrodite') {
        return person
    }
})
const heavyCharacters = people.filter(person => person.mass > 100 || person.mass === 'heavy')
const lightCharacters = people.filter(person => person.mass < 75 || person.mass === 'light')

console.log(otherCharacters)

function populateDOM(characters) {
    removeChildren(mainContent)
    characters.forEach(person => {
        const charFigure = document.createElement('figure')
        const charImg = document.createElement('img')
        let charNum = getLastNumber(person.url)
        charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
        const charCaption = document.createElement('figcaption')

        charCaption.textContent = person.name

        charFigure.appendChild(charImg)
        charFigure.appendChild(charCaption)
        mainContent.appendChild(charFigure)
})
}