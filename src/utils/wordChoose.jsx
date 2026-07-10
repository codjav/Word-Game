import { words } from "../assets/words"

export function wordChoose () {
    const index = Math.floor(Math.random()*words.length)
    
    return words[index]
}