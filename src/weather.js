import icon1 from "./icons/weather-icons-01-svgrepo-com.svg"
import searchIcon from "./icons/search.svg"

function makeWeatherPage(loc, days, searchfunc){
    console.log(days)
    const display = document.createElement("div")
    display.classList.add("weather-display")

    const topContainer = document.createElement("div")
    topContainer.classList.add("search-tabs-container")

    const search = document.createElement("div")
    search.classList.add("search")

    const form = document.createElement("div")
    form.classList.add("form")

    const input = document.createElement("input")
    input.setAttribute("type","text")
    input.value = loc

    const button = document.createElement("button")
    button.classList.add("clickable")
    const icon = document.createElement("img")
    icon.classList.add("icon")
    icon.src = searchIcon

    button.addEventListener("click",() => {searchfunc(input.value)})

    button.appendChild(icon)
    form.appendChild(input)
    form.appendChild(button)
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
        tMax.textContent = Math.floor(day.maxTemp)
        tMin.textContent = Math.floor(day.minTemp)

        // TODO: CHANGE TO NOT STATIC
        weatherIcon.src = icon1

        temps.appendChild(tMax)
        temps.appendChild(tMin)
        div.appendChild(weatherIcon)
        div.appendChild(temps)
        listItem.appendChild(date)
        listItem.appendChild(div)

        list.appendChild(listItem)

        listItem.classList.add("clickable")
        listItem.addEventListener("click",() => {
            clearSelected(list)
            listItem.classList.add("selected")
            weatherData.replaceChildren(makeDayTable(day))
        })
    });

    container.appendChild(list)
    topContainer.appendChild(search)
    topContainer.appendChild(container)

    display.appendChild(topContainer)

    // BODY
    const weatherData = document.createElement("div")
    weatherData.classList.add("weather-data")

    // Load Today's Weather as default
    list.firstChild.classList.add("selected")
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

function clearSelected(list){
    for(const li of list.children){
        li.classList.remove("selected")
    }
}

function makeDayTable(day){
    const table = document.createElement("table")
    const head = document.createElement("thead")
    const headRow = document.createElement("tr")
    const headHead = document.createElement("th")
    headRow.appendChild(headHead)

    const body = document.createElement("tbody")
    const iconRow = document.createElement("tr")
    const iconHead = document.createElement("th")
    iconHead.textContent = "Weather Symbols"
    iconRow.appendChild(iconHead)
    iconRow.classList.add("icon-row")

    const precipRow = document.createElement("tr")
    const precipHead = document.createElement("th")
    precipHead.textContent = "Chance of precipitation"
    precipRow.appendChild(precipHead)
    precipRow.classList.add("precip-row")

    const tempRow = document.createElement("tr")
    const tempHead = document.createElement("th")
    tempHead.textContent = "Temperature (°C)"
    tempRow.appendChild(tempHead)
    tempRow.classList.add("temp-row")

    const {min,max} = getMinMaxTemp(day.getHours())

    day.getHours().forEach((hour) => {
        // Time
        const timeData = document.createElement("td")
        const time = document.createElement("div")
        time.classList.add("time-hours")
        time.textContent = formatHour(hour.getDateTime())
        timeData.appendChild(time)
        headRow.appendChild(timeData)

        const yOffSet = getPosition(getScalar(hour.getTemp(),min,max))
        // Temperature
        const tempData = document.createElement("td")
        const temp = document.createElement("div")
        temp.classList.add("temp-value")
        temp.textContent = `${hour.getTemp()}°`
        temp.style.bottom = `${yOffSet.toString()}px`
        tempData.appendChild(temp)
        tempRow.appendChild(tempData)

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
    })

    head.appendChild(headRow)
    table.appendChild(head)
    body.appendChild(tempRow)
    body.appendChild(iconRow)
    body.appendChild(precipRow)
    table.appendChild(body)

    return table
}

function formatHour(date) {
    return date.toString().slice(0,5)
}

function getMinMaxTemp(days){
    let min = 500
    let max = -500
    days.forEach((day) => {
        if(day.getTemp() < min){
            min = day.getTemp()
        }
        if(day.getTemp() > max){
            max = day.getTemp()
        }
    })

    return {min,max}
}

function getScalar(temp,min,max){
    return (temp-min)/(max-min)
}

function getPosition(scalar){
    const min = 0
    const max = 70
    return min+(max-min)*scalar
}

export {makeWeatherPage}