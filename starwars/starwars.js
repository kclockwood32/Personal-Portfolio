import {films} from '../data/films.js'

/* let item0ne = document.querySelector('#item1')

item0ne.textContent = films[0].title

console.log(films[0].title)
console.log(films.length) */

let titleList = document.querySelector('.titleList')

for (var i = 0; i < films.length; i++) {
    let title = films[i].title
    let newItem = document.createElement('li')
    newItem.textContent = title
    titleList.appendChild(newItem)
}