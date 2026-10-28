
import { Params } from "../../interfaces"
import { state } from "../../state"
import { time } from "console";
const reglas={
    piedra:"tijera",
    papel:"piedra",
    tijera:"papel"
}


export function initPagePlay(params:Params)
{
    let assigningChoice = false;

 

const checkChoices = async () => {
    const { localPlayer, remotePlayer } = state.getState();

    if (!localPlayer.choice && remotePlayer.choice && !assigningChoice) {
        assigningChoice = true;

        const newChoice:any= reglas[remotePlayer.choice];

        try {
            const res:any = await state.choseAMove(newChoice);

            if (!res.succes) {
                assigningChoice = false;
            }
            return true
        } catch (error) {
            assigningChoice = false;
            console.error(error);
        }
    }
};
 
   const unsubscribeState=state.subscribe( ()=>{
    

   const { localPlayer, remotePlayer } = state.getState();
   

    if (localPlayer.choice && remotePlayer.choice) {
        params.goTo("/move");
        return;
    }
  
   if (timeIsOver) {
         checkChoices();
    }
   
})

    const div=document.createElement('div')
    const style=document.createElement('style')
    style.innerHTML=`
       .container{
    
    padding-top:125px;
    display: flex;
    flex-direction: column;
    
width: 375px;
    margin: 0 auto;
    


    
    height: 100vh;
    
}
    .counter{
    align-self:center;
    margin:0 auto;}
    .rock-papers {
    margin-top: auto;
}

    .hidden { display: none; }
    
    
    `
    div.classList.add('container')

    let timer1: ReturnType<typeof setTimeout> | null = null;
    let timer2: ReturnType<typeof setTimeout> | null = null;
    
    div.innerHTML=`
        <counter-img class="counter" id="counter"></counter-img>

        <rock-papers modifications='page-1' interactive id="rps" class="rock-papers" height="233px"></rock-papers>
        
    
    `
    const rps=div.querySelector("#rps")
    const counter=div.querySelector('#counter')
    let userHasPlayed = false;
    
    rps?.addEventListener("select-users", async(e:any)=>{
        userHasPlayed=true
        
        const res:any= await state.choseAMove(e.detail.choice)
        if(res.succes){
         
        }
        else{

            console.error(res)
        }
        counter?.classList.add('hidden')
        
        
        
        
       
       
        
            
          
    })
    let timeIsOver = false;
    counter?.addEventListener("time-out",(e:any)=>{
        
          if (userHasPlayed) return; 
       timeIsOver=true
       checkChoices()
       const {localPlayer,remotePlayer}=state.getState()
        if(!localPlayer.choice && !remotePlayer.choice){
            params.goTo("/move")
        }
        


      
    })
 
 

   

    div.appendChild(style)
    return {element:div, 
        onDestroy:unsubscribeState}
   
}