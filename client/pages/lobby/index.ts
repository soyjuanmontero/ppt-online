import { Params } from "../../interfaces"
import { state } from "../../state"



export function initPageLoby(params:Params){
    const renderLobyState=()=>{
        const currentState=state.getState()
        const stateBothPlayerOnline=currentState.playersOnline
         const {playersReadyToGame}=currentState
         console.log(playersReadyToGame)
         const localPlayerReady=currentState.localPlayer.ready
        const  contentParagraphEl=div.querySelector(".content-paragraph")
        
        if(!contentParagraphEl){
                return
            }

        const containerButtonEl=div.querySelector(".container-button") 

         if(!containerButtonEl){
                return
            }

        
        if(!stateBothPlayerOnline){
          
            contentParagraphEl.innerHTML=`
           <p>
            Compartí el código:
            </p>
            <p class="room-code">
            76HH23
            </p>
              <p>
            Con tu contrincante
            </p>
            `
             
            containerButtonEl.classList.add("none")
            return
            
        } if(!localPlayerReady){
            
            contentParagraphEl.innerHTML=`
              <p>
            Presioná jugar
y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.
            </p>

            `
              
           
            return
            
        }
        if(!playersReadyToGame){
contentParagraphEl.innerHTML=`

<p>
          
Esperando a que Paula presione <br>¡Jugar!...
</p>
`
containerButtonEl.classList.add("none")
     return
            
        }
        params.goTo("/play")
      
        
    }

    const unsubscribe = state.subscribe(renderLobyState);

    const div=document.createElement('div')
    const style=document.createElement('style')
    style.innerHTML=`
    .container{
    padding-top:24px;
        min-height:100dvh;
        
    display: flex;
    flex-direction: column;
     
     min-width: 375px;
    margin: 0 auto;
    --hands-height: 128px;
   
    
    
}   @media (min-width: 768px) {
  .container {
 
         --hands-height: 181px;
        
  
  }
}
    


.content{
  
  flex:1;
display: flex;
 flex-direction:column;
 justify-content:center;
 align-items:center;
 gap:39px;
 
  
  }
    
   

p{
margin:0;
text-align:center;
}
   
.content-paragraph{
width:317px;
display:flex;
flex-direction:column;

justify-content:center;



font-weight:600;
font-size:35px;
margin:0 auto
}

.room-code{
font-size:48px;
font-weight:700;
}
.container-button{

width:322px;}
 
   .none{
   display:none;
   
   }
    `
    
    
    
    
    div.classList.add("container")
    div.innerHTML=`
    <game-header></game-header>
    <div class="content">
        <div class="content-paragraph">
            
           
        </div>
        <div class="container-button">
        <button-primary>Jugar</button-primary>
        </div>
      
    </div>

        <rock-papers height="var(--hands-height)"></rock-papers>
        
    
    `
    renderLobyState()
    
    const buttonEl=div.querySelector("button-primary")
    if(buttonEl){
buttonEl.addEventListener("click",(e)=>{
        state.setState({
            localPlayer:{
                ...state.getState().localPlayer,
                ready:true

            }
        })
       

    })

    }
    


   

    div.appendChild(style)

    return {element:div,
        onDestroy: unsubscribe
    }
   
}