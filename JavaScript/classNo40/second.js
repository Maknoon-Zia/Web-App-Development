// import {name} from "./first"
// console.log(name);

import {username , age} from "./first"
const data = document.getElementById("username")
data.innerHTML = `<h1>${username}</h1>`
const data_age = document.getElementById("userage")
data_age.innerHTML = `<h1>${age}</h1>`