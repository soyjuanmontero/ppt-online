import { Params } from "../../interfaces"
import { state } from "../../state"

export function initPageResult(params:Params){
    
    const div=document.createElement('div')
    div.classList.add('container')
    const style=document.createElement('style')
    style.innerHTML=`

    .container{
   
    height:100vh;

   padding: 36px 20px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background-color:#888949E5;
    
}
  
.container-boton{
 width:375px;}

.star{
margin-bottom:11px;
}
.score{
margin-bottom:21px;
}
.lose{
background-color:#894949E5}
    
    `
    
    function render(){
        const currentState=state.getState()
       const result= state.whoWins(currentState.computerMove,currentState.playerMove)
        div.classList.remove("lose") 
       if(result==="lose"){
        div.classList.add("lose")
       }



        div.innerHTML=`
        <result-star class="star" result="${result}"></result-star>
        <score-el class="score" computer="${currentState.score.computer}" player="${currentState.score.player}"></score-el>
        <div class="container-boton">
        <button-primary textContent='Volver a Jugar' id="button"></button-primary>
        </div>
        
        
        `
        div.appendChild(style)
    }
    
    
    
    render()
    const buttonEl=div.querySelector("#button")
    buttonEl?.addEventListener("click", (e)=>{
        
        
        params.goTo("/step-1")
    })
    
    
    

    return {element:div}
   
}