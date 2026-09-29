import { initComponentButton } from "./components/button"
import { initComponentConfrontation } from "./components/confrontation"
import { initComponentCounter } from "./components/counter"
import { initComponentStar } from "./components/star"
import { initComponentRockPaperScissors } from "./components/rock-paper-scissors"
import { initComponentScore } from "./components/score"
import { initRouter } from "./router"

import { state } from "./state"
interface User{
    userName:string,
    userId:string,
    choice?:any
}


initComponentButton()

initComponentRockPaperScissors()
initComponentConfrontation()

                initComponentStar()
initComponentCounter()
initComponentScore();


(async() => {
        const appEl=document.querySelector(".app")
    if(appEl){
    
state.subscribe(()=>{
    console.log(state.getState())
})
       const res:any= await state.createUser("pedro")
       console.log(res)
       if(res.succes){
        state.setState({
            room:{
                roomShortId:"0618"
            }
        })
        const resRoomLongId :any=await state.getAndSaveRoomLongId()
        console.log(resRoomLongId)
    
        if(resRoomLongId.succes){
              const resJoinToTheRoom= await state.joinTheRoom()
              console.log(resJoinToTheRoom)
              }
    
    }
        
                           

    //         // const resGetLoongId=state.getAndSaveRoomLongId()
    //         // if(resGetLoongId.succes){
    //         //     state.joinTheRoom()
    //         // }


    //     }

    //    }
      
        initRouter(appEl)
    
    }
    
})();





