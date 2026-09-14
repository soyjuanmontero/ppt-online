import { Params } from "../../interfaces"
import { state } from "../../state"



export function initPagePlay(params:Params){

    const div=document.createElement('div')
    const style=document.createElement('style')
    style.innerHTML=`
       .container{
    
    
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
width: 375px;
    margin: 0 auto;
    


    
    height: 100vh;
    
}
    .counter{
    margin:0 auto;}

    .hidden { display: none; }
    
    `
    div.classList.add('container')

    let timer1: ReturnType<typeof setTimeout> | null = null;
    let timer2: ReturnType<typeof setTimeout> | null = null;
    
    div.innerHTML=`
        <counter-img class="counter" id="counter"></counter-img>

        <rock-papers modifications='page-1' interactive id="rps"></rock-papers>
        
    
    `
    const rps=div.querySelector("#rps")
    const counter=div.querySelector('#counter')
    let userHasPlayed = false;
    
    rps?.addEventListener("select-users",(e:any)=>{
        userHasPlayed=true
        counter?.classList.add('hidden')
        
        
        const move=state.move(e.detail.choice)
        
       
       
        
            
            timer1=setTimeout(() => {
                params.goTo("/move")
    
    }, 2000);
    })
    
    counter?.addEventListener("time-out",(e:any)=>{
          if (userHasPlayed) return; 
        const playerMove=state.computerSelection()
        const move=state.move(playerMove)
        
        
        

        timer2=setTimeout(() => {
            params.goTo("/move")
  
}, 1000);
    })
   
const onDestroy = () => {
        if (timer1) clearTimeout(timer1);
        if (timer2) clearTimeout(timer2);
    };
    div.appendChild(style)
    return {element:div, onDestroy}
   
}