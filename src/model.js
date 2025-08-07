async function getWeatherData(loc,units){
    const key = "NJYG6EQAQSJ464TVAPQ5TTB93"; // Free tier key don't bother
    const query = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}/next7days?unitGroup=${units}&include=hours&key=${key}&contentType=json`
    const response = await fetch(query,{mode: "cors", method: "GET", headers:{}})
    console.log(response)
    if(response.status == 400){
        throw new Error(`Place not found, try another location.`)
    }else if(!response.ok){
        throw new Error(`There was a problem fetching weather data.`)
    }

    const jsonData = await response.json()
    console.log(jsonData)

    return jsonData
}

export {getWeatherData}