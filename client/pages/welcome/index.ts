import { Params } from "../../interfaces"

export function initPageWelcome(params:Params){

    const div=document.createElement('div')
    const style=document.createElement('style')
    style.innerHTML=`

    .container{
    overflow-y: hidden;
    
    
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
width: 375px;
    margin: 0 auto;
    


    
    height: 100vh;
    
}
    .welcome-title{
    width: 288px;
  
  
    
    margin: 0 auto;
    
}


    .welcome-title h1{
        text-align: center;
        font-size: 80px;
        font-weight: 700;
        
    margin: 0;
    color: var(--color-title);

}
.welcome-button{
margin: 0 auto;
    width: 322px;
}
    
    `
    
    
    
    
    div.classList.add("container")
    div.innerHTML=`
    <div class="welcome-title">
        <h1 >
                Piedra Papel o 
                
                Tijera
        </h1>
        </div>
        <div class="welcome-button">
        <button-primary textContent="Empezar" id="button-welcome"></button-primary> 
        </div>


        <rock-papers></rock-papers>
        
    
    `
    const button=div.querySelector("#button-welcome")
    button?.addEventListener("click",(e)=>{
        e.preventDefault()
        params.goTo("/step-1")
      

    })
    div.appendChild(style)

    return {element:div}
   
}