import { Params } from "../../interfaces"
import { state } from "../../state"

export function initpageMove(params:Params){
    
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
        
        
    div.innerHTML=`
        <rock-papers modifications='versus' local-player=${localPlayer.choice} remote-player=${remotePlayer.choice} ></rock-papers>
    
    `
  
    
    div.appendChild(style)

    }

   


        

 
 


    

const timer=setTimeout(() => {
    const {localPlayer, remotePlayer}=state.getState()
    if(remotePlayer.choice===localPlayer.choice){

       params.goTo("/play")
    }
   
     else{

         params.goTo("/result")
    }  
        

}, 2000);
    

    const onDestroy = () => {
        clearTimeout(timer);
        
    }

    render()
    return {element:div,onDestroy}
}