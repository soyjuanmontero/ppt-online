import  "./components/custom-form"
import { initComponentButton } from "./components/button"
import { initComponentTextField } from "./components/text-field"
import { initComponentConfrontation } from "./components/confrontation"
import { initComponentCounter } from "./components/counter"
import { initComponentStar } from "./components/star"
import { initComponentRockPaperScissors } from "./components/rock-paper-scissors"
import { initComponentScore } from "./components/score"
import { initRouter } from "./router"
import { initComponentGameHeader } from "./components/game-header"



initComponentTextField()
initComponentButton()

initComponentRockPaperScissors()
initComponentConfrontation()

                initComponentStar()
initComponentCounter()
initComponentScore()
initComponentGameHeader();


(() => {
        const appEl=document.querySelector(".app")
    if(appEl){
    

      
        initRouter(appEl)

    }
    
})();





