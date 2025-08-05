import icon1 from "./icons/weather-icons-01-svgrepo-com.svg"
import searchIcon from "./icons/search.svg"

function makeWeatherPage(days, searchfunc){
    console.log(days)
    const display = document.createElement("div")
    display.classList.add("weather-display")

    const topContainer = document.createElement("div")
    topContainer.classList.add("search-tabs-container")

    const search = document.createElement("div")
    search.classList.add("search")

    const head = document.createElement("h1")
    head.textContent = "Find a Forecast"

    const form = document.createElement("div")
    form.classList.add("form")

    const input = document.createElement("input")
    input.setAttribute("type","text")

    const button = document.createElement("button")
    button.classList.add("clickable")
    const icon = document.createElement("img")
    icon.classList.add("icon")
    icon.src = searchIcon

    button.addEventListener("click",() => {searchfunc(input.value)})

    button.appendChild(icon)
    form.appendChild(input)
    form.appendChild(button)
    search.appendChild(head)
    search.appendChild(form)

    const container = document.createElement("div")
    container.classList.add("day-tabs-container")
    const list = document.createElement("ul")

    days.forEach(day => {
        const listItem = document.createElement("li")
        const date = document.createElement("time")
        const div = document.createElement("div")
        const weatherIcon  = document.createElement("img")
        const temps = document.createElement("div")
        const tMax = document.createElement("span")
        const tMin = document.createElement("span")

        weatherIcon.classList.add("icon")
        temps.classList.add("day-temp-data")
        tMax.classList.add("maxTemp")
        tMin.classList.add("minTemp")

        date.dateTime = day.getDateTime().toISOString()
        date.textContent = formatDay(day.getDateTime())
        tMax.textContent = day.maxTemp
        tMin.textContent = day.minTemp

        // TODO: CHANGE TO NOT STATIC
        weatherIcon.src = icon1

        temps.appendChild(tMax)
        temps.appendChild(tMin)
        div.appendChild(weatherIcon)
        div.appendChild(temps)
        listItem.appendChild(date)
        listItem.appendChild(div)

        list.appendChild(listItem)
    });

    container.appendChild(list)
    topContainer.appendChild(search)
    topContainer.appendChild(container)

    display.appendChild(topContainer)

    // BODY
    const weatherData = document.createElement("div")
    weatherData.classList.add("weather-data")

    weatherData.replaceChildren(makeDayTable(days[0]))
    display.appendChild(weatherData)

    return display
}

function formatDay(date){
    const today = new Date(Date.now())
    if(date.getDate() == today.getDate()){return "Today"}
    const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    return `${dayNames[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`
}

function setSelectedDay(day,container){
    
}

function makeDayTable(day){
    const table = document.createElement("table")
    const head = document.createElement("thead")
    const headRow = document.createElement("tr")
    const body = document.createElement("tbody")
    const iconRow = document.createElement("tr")
    const precipRow = document.createElement("tr")
    const tempRow = document.createElement("tr")

    day.getHours().forEach((hour) => {
        // Time
        const timeData = document.createElement("td")
        const time = document.createElement("div")
        time.classList.add("time-hours")
        time.textContent = formatHour(hour.getDateTime())
        timeData.appendChild(time)
        headRow.appendChild(timeData)

        // Weather icon
        const iconData = document.createElement("td")
        const icon = document.createElement("img")
        icon.classList.add("icon")
        icon.src = icon1
        iconData.appendChild(icon)
        iconRow.appendChild(iconData)

        // Precip chance
        const precipData = document.createElement("td")
        const precip = document.createElement("div")
        precip.textContent = `${hour.getPrecipProb()}%`
        precipData.appendChild(precip)
        precipRow.appendChild(precipData)

        // Temperature
        const tempData = document.createElement("td")
        const temp = document.createElement("div")
        temp.textContent = `${hour.getTemp()}°`
        tempData.appendChild(temp)
        tempRow.appendChild(tempData)
    })

    head.appendChild(headRow)
    table.appendChild(head)
    body.appendChild(iconRow)
    body.appendChild(precipRow)
    body.appendChild(tempRow)
    table.appendChild(body)

    return table
}

function formatHour(date) {
    return date.toString().slice(0,5)
}

function generateTempColour(temp){
    if(temp > 0){
        
    }
}

export {makeWeatherPage}