import searchIcon from "./icons/search.svg"

function makeSearchBar(searchfunc, loc){
    const search = document.createElement("div")
    search.classList.add("search")

    const form = document.createElement("div")
    form.classList.add("form")

    if(!loc){
        const head = document.createElement("h1")
        head.textContent = "Find a Forecast"
        search.appendChild(head)
    }

    // Search input
    const input = document.createElement("input")
    input.setAttribute("type","text")
        if(loc){input.value = loc}

    // Search button
    const button = document.createElement("button")
    button.classList.add("clickable")
    const icon = document.createElement("img")
    icon.classList.add("icon")
    icon.src = searchIcon

    const errMessage = document.createElement("span")
    errMessage.classList.add("error")
    errMessage.classList.add("hidden")

    button.addEventListener("click",() => {
        searchfunc(input.value).catch((err)=>{
            errMessage.textContent = err.message
            errMessage.classList.toggle("hidden")
        })
    })

    button.appendChild(icon)
    form.appendChild(input)
    form.appendChild(button)
    search.appendChild(form)
    search.appendChild(errMessage)

    return search
}

export {makeSearchBar}