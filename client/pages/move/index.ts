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
        const currentState=state.getState()
        
        
    div.innerHTML=`
        <rock-papers modifications='versus' player=${currentState.playerMove} computer=${currentState.computerMove} ></rock-papers>
    
    `
  
    
    div.appendChild(style)

    }

   


        

 
 


    

const timer=setTimeout(() => {
    const currentState=state.getState()
    if(currentState.computerMove===currentState.playerMove){

        params.goTo("/step-1")
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