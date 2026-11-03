import { Params } from "../../interfaces"
import { state } from "../../state"

export function  initpageMove(params:Params){
    
    const div=document.createElement('div')
    div.classList.add('container')
    const style=document.createElement('style')
     style.innerHTML=`
       .container{
    
    
    
width: 375px;
   


    
    height: 100vh;
    
}
   
    
    `

    function render(){
        const {localPlayer,remotePlayer}=state.getState()
        
        if(!localPlayer.choice && !remotePlayer.choice){
            console.log("aqui")
             div.innerHTML=`
        <rock-papers modifications='versus'   ></rock-papers>
    
    `
            return
        }
    div.innerHTML=`
        <rock-papers modifications='versus' local-player=${localPlayer.choice } remote-player=${remotePlayer.choice } ></rock-papers>
    
    `
  
    
    div.appendChild(style)

    }

   

let timer: ReturnType<typeof setTimeout>;

const startMove = async () => {
    const { localPlayer, remotePlayer } = state.getState();
    
    const isDraw = localPlayer.choice === remotePlayer.choice;
   

    if (!isDraw) {
       
    }

    timer = setTimeout( async() => {
        if(!localPlayer.choice&& !remotePlayer.choice){

            params.goTo("/play")
            return 
        }
        if (isDraw) {
            const res:any=await state.resetChoices()
            if(res.succes){
                const {localPlayer,remotePlayer}=state.getState()
                if(!localPlayer.choice && !remotePlayer.choice){
            params.goTo("/play");
            }
            }
        
        } else { 
            const resHistory:any=await state.updateHistory();
            if(resHistory.succes){
  const res:any= await state.resetRound() 
        if(res.succes){

            params.goTo("/result");

            }
           
        }
            

        
        }
    }, 2000);
};

startMove();
    
    




    



    const onDestroy = () => {
        clearTimeout(timer);
        
    }

    render()
    return {element:div,onDestroy}
}