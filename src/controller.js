import { makeHomePage } from "./search"
import {getWeatherData} from "./model"
import { makeWeatherPage } from "./weather"

function init(){
    const titleBut = document.querySelector("header h1")
    titleBut.addEventListener("click",() =>{
        loadContent(makeHomePage(showWeatherPage))
    })

    loadContent(makeHomePage(showWeatherPage))

    
}

async function showWeatherPage(input){
    const data = await getWeatherData(input,"uk")
    loadContent(makeWeatherPage(data.resolvedAddress, data.days, showWeatherPage))
}

function loadContent(page){
    const content = document.querySelector("div.content")
    content.replaceChildren(page)
}

export {init}