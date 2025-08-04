import { makeHomePage } from "./search"
import {getWeatherData} from "./model"

function init(){

    loadContent(makeHomePage(searchfunc))
}

function searchfunc(input){
    const data = getWeatherData(input,"uk")
    data.then((data) => {
    if(!data){
        console.log("Error fetching data")
        return;
    }
    data.forEach(day => {
        console.log(`Date: ${day.getDateTime()} Max temp: ${day.getMaxTemp()} Min Temp: ${day.getMinTemp()}`)
    })
})
}

function loadContent(page){
    const content = document.querySelector("div.content")
    content.replaceChildren(page)
}

export {init}