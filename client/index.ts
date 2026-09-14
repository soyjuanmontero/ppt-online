import { initComponentButton } from "./components/button"
import { initComponentConfrontation } from "./components/confrontation"
import { initComponentCounter } from "./components/counter"
import { initComponentStar } from "./components/star"
import { initComponentRockPaperScissors } from "./components/rock-paper-scissors"
import { initComponentScore } from "./components/score"
import { initRouter } from "./router"


initComponentButton()

initComponentRockPaperScissors()
initComponentConfrontation()

                initComponentStar()
initComponentCounter()
initComponentScore()
const appEl=document.querySelector(".app")
if(appEl){
    
    initRouter(appEl)

}


