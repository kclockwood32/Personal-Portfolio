import {films} from '../data/films.js'

/* let item0ne = document.querySelector('#item1')

item0ne.textContent = films[0].title

console.log(films[0].title)
console.log(films.length) */

let movieList = document.querySelector('.movieList')

for (let i = 0; i < films.length; i++) {
    const foundFilm = films.find(film => getLastNumber(film.url) === (i + 1))
    let figure = document.createElement('figure')
    let newImage = document.createElement('img')
    let figCaption = document.createElement('figcaption')
    newImage.src = 'https://starwars-visualguide.com/assets/img/films/4.jpg'
    figCaption.textContent = foundFilm.title

    figure.appendChild(newImage)
    figure.appendChild(figCaption)
    movieList.appendChild(figure)
}

function getLastNumber(url) {
    let end = url[url.length - 2]
    return parseInt (end, 10)
}