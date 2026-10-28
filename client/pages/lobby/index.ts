import { Params } from "../../interfaces"
import { state } from "../../state"



export function initPageLoby(params:Params){
   state.listenToTheRoom()
 const unsubscribeState = state.subscribe(() => {
    console.log("Aqui")
    renderLobbyState();
    state.bothPlayersReady
});
    const renderLobbyState=  ()=>{
      
        
        const {playersOnline, playersReadyToGame,localPlayer, remotePlayer, score, room}=state.getState()
        

        
         
     
         
        const  contentParagraphEl=div.querySelector(".content-paragraph")
        const headerEl=div.querySelector(".header")
        
        if(!contentParagraphEl){
                return
            }

               if(!headerEl){
                return
            }
        const containerButtonEl=div.querySelector(".container-button") 

         if(!containerButtonEl){
                return
            }

        
        if(!playersOnline){
            headerEl.innerHTML=`
            <game-header local_player-name="${localPlayer.userName}" room-id="${room.roomShortId}"></game-header>
            `
          
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
            
        } if(!localPlayer.ready){
             headerEl.innerHTML=`
            <game-header local_player-name="${localPlayer.userName}" remote_player-name="${remotePlayer.userName}" score_local-player="${score.localPlayer}" score_remote-player="${score.remotePlayer}" room-id="${room.roomShortId}"></game-header>
            `
            
            contentParagraphEl.innerHTML=`
              <p>
            Presioná jugar
y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.
            </p>

            `
            containerButtonEl.classList.remove("none")
              
           
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
           if(state.data.playersReadyToGame){
        params.goTo("play")
    }
    
      
        
    }

   

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
    
    
    const {localPlayer,remotePlayer,score, room}=state.getState()
    
    
    div.classList.add("container")
    div.innerHTML=`
    <div class="header">
    
    </div>
    <div class="content">
        <div class="content-paragraph">
            
           
        </div>
        <div class="container-button">
        <button-primary>Jugar</button-primary>
        </div>
      
    </div>

        <rock-papers height="var(--hands-height)"></rock-papers>
        
    
    `
    renderLobbyState()
    
    const buttonEl=div.querySelector("button-primary")
    if(buttonEl){
buttonEl.addEventListener("click",async(e)=>{
   
          const resRedy:any =await state.readytoPlay()
       if(resRedy.succes){
      
     
        
    }

    })
 
    

    }
    


   

    div.appendChild(style)

    return {element:div,
        onDestroy: unsubscribeState
    }
   
}