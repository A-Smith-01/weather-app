import searchIcon from "./icons/search.svg"

function makeHomePage(searchfunc){
    const background = document.createElement("div")
    background.classList.add("search-background")

    const content = document.createElement("div")
    content.classList.add("search")

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
    content.appendChild(head)
    content.appendChild(form)
    background.appendChild(content)

    return background
}

export {makeHomePage}