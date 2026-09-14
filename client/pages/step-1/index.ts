import { Params } from "../../interfaces"

export function initPageStepUno(params:Params){

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

    .step-1-title{
text-align: center;
    
}
.step-1-title h1{
    margin: 0;
   
    font-weight: 600;
    font-size: 40px;
}
    `
    

    
    div.classList.add("container")
    div.innerHTML=`
    <div class="step-1-title">
        <h1 >
                Presioná jugar
y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.
        </h1>
        </div>
        <div class="welcome-button">
        <button-primary textContent="Jugar" id="button-step-1"></button-primary> 
        </div>


        <rock-papers modifications="page-1"></rock-papers>
        
    
    `
    const button=div.querySelector("#button-step-1")
    
    button?.addEventListener("click",(e)=>{
        e.preventDefault()
        
        params.goTo("/play")
      

    })
div.appendChild(style)
    return {element:div}
   
}