import { getWeatherData } from "./model";

const data = getWeatherData("epsom","uk")

data.then((data) => {
    if(!data){
        console.log("Error fetching data")
        return;
    }
    data.forEach(day => {
        console.log(`Date: ${day.getDateTime()} Max temp: ${day.getMaxTemp()} Min Temp: ${day.getMinTemp()}`)
    })
})