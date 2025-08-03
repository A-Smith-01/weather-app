async function getWeatherData(loc,units){
    const key = "NJYG6EQAQSJ464TVAPQ5TTB93";
    const query = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}/next7days?unitGroup=${units}&include=hours&key=${key}&contentType=json`

    try{
        const response = await fetch(query,{mode: "cors", method: "GET", headers:{}})
        console.log(response)
        if(!response.ok){
            throw new Error(`Request failed: ${response.status} ${response.statusText}`)
        }

        const jsonData = await response.json()
        console.log(jsonData)

        return processJson(jsonData)
    }catch(err){
        console.error("Error fetching weather data:", err);
        return null; 
    }

}

function processJson(jsonData){
    const loc = jsonData.resolvedAddress
    const dayData = jsonData.days
    const days = []
    dayData.forEach(day => {
        const dateTime = day.datetime
        const dayHigh = day.tempmax
        const dayLow = day.tempmin
        const dayData = new Day(dateTime,dayHigh,dayLow)
        days.push(dayData)
    });

    console.log(days)

    return days
}

class Day{
    hours = []
    constructor(dateTime, max, min){
        this.dateTime = dateTime
        this.maxTemp = max
        this.minTemp = min
    }

    addHour(hour){
        this.hours.push(hour)
    }

    getHours(){
        return this.hours
    }

    getDateTime(){
        return this.dateTime
    }

    getMaxTemp(){
        return this.maxTemp
    }

    getMinTemp(){
        return this.minTemp
    }
}

class Hour{

}

export {getWeatherData}