import { people } from '../data/people.js'

const mainContent = document.querySelector('#main')

people.forEach(person => {
    const charFigure = document.createElement('figure')
    const charImg = document.createElement('img')
    const charCaption = document.createElement('figcaption')
    charImg.src = `https://starwars-visualguide.com/assets/img/films/${i + 1}.jpg`
    charCaption.textContent = person.name

    charFigure.appendChild(charImg)
    charFigure.appendChild(charCaption)
    mainContent.appendChild(charFigure)
})