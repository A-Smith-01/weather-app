import { makeSearchBar } from "./search-bar"

function makeHomePage(searchfunc){
    const background = document.createElement("div")
    background.classList.add("search-background")

    const content = makeSearchBar(searchfunc)
    background.appendChild(content)

    return background
}

export {makeHomePage}