import { makeHomePage } from "./search"
import {getWeatherData} from "./model"
import { makeWeatherPage } from "./weather"

function init(){
    const days = searchfunc("Epsom")

    days.then((data) => {loadContent(makeWeatherPage(data,searchfunc))})
}

async function searchfunc(input){
    const data = await getWeatherData(input,"uk")
    if(!data){
        console.log("Error fetching data")
        return;
    }
    data.forEach(day => {
        console.log(`Date: ${day.getDateTime()} Max temp: ${day.getMaxTemp()} Min Temp: ${day.getMinTemp()}`)
    })
    return data
}

function loadContent(page){
    const content = document.querySelector("div.content")
    content.replaceChildren(page)
}

export {init}