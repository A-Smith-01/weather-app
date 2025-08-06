import { makeHomePage } from "./search"
import {getWeatherData} from "./model"
import { makeWeatherPage } from "./weather"

function init(){
    loadContent(makeHomePage(showWeatherPage))

    
}

function showWeatherPage(input){
    const data = searchfunc(input)
    data.then((data) => {loadContent(makeWeatherPage(data.loc, data.days, showWeatherPage))})
}

async function searchfunc(input){
    const data = await getWeatherData(input,"uk")
    if(!data){
        console.log("Error fetching data")
        return;
    }
    // data.forEach(day => {
    //     console.log(`Date: ${day.getDateTime()} Max temp: ${day.getMaxTemp()} Min Temp: ${day.getMinTemp()}`)
    // })
    return data
}

function loadContent(page){
    const content = document.querySelector("div.content")
    content.replaceChildren(page)
}

export {init}