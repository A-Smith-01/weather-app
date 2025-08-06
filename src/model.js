async function getWeatherData(loc,units){
    const key = "NJYG6EQAQSJ464TVAPQ5TTB93"; // Free tier key don't bother
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
        day.hours.forEach((hour) => {
            const hourData = new Hour(
                hour.datetime,
                hour.temp,
                hour.feelslike,
                hour.precipprob,
                hour.preciptype,
                hour.cloudcover
            )
            dayData.addHour(hourData)
        })
        days.push(dayData)
    });

    console.log(days)

    return {loc, days}
}

class Day{
    hours = []
    constructor(dateTime, max, min){
        this.dateTime = new Date(dateTime)
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
        return Math.floor(this.maxTemp)
    }

    getMinTemp(){
        return Math.floor(this.minTemp)
    }
}

class Hour{
    constructor(dateTime, temp, feelsLike, precipProb, precipType, cloudCover){
        this.dateTime = dateTime
        this.temp = temp
        this.feelsLike = feelsLike
        // this.precip = precip
        this.precipProb = precipProb
        this.precipType = precipType
        this.cloudCover = cloudCover
    }

    getDateTime(){
        return this.dateTime
    }

    getTemp(){
        return Math.floor(this.temp)
    }

    getFeelsLike(){
        return this.feelsLike
    }

    getPrecipProb(){
        return Math.floor(this.precipProb)
    }

    getWeatherType(){
        if(this.cloudCover > 88){
            return "overcast"
        }else if(this.cloudCover > 60){
            return "cloudy"
        }else if(this.cloudCover > 25){
            return "cloudy intervals"
        }else{
            return "clear"
        }
    }
}

export {getWeatherData}