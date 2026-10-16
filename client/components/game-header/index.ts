export function initComponentGameHeader(){
class GameHeader extends HTMLElement{
    constructor(){
        super()

    }
    shadow=this.attachShadow({mode:"open"})
          divEl=document.createElement("div")
         styleElement=document.createElement("style")
         
    connectedCallback(){
        this.render()

    }
    
    render(){
        
      
       const  localPlayerName=this.getAttribute("local_player-name")?? "CARLOS"
       const  remotePlayerName=this.getAttribute("remote_player-name")?? "ALFONSO"
       const scoreLocalPlayer=this.getAttribute("score_local-player")?? "0"
       const scoreRemotePlayer=this.getAttribute("score_remote-player") ?? "0"
    
        
         
    this.divEl.classList.add("container")
        this.styleElement.innerHTML=`
        .container{
        display:flex;
        justify-content :space-around;
        font-size:24px;
        }
        .score{
            font-weight:600;
        }
            .room{
            
            font-weight:700;
            }
   
        .room{
        text-align:end;
        }
        .room-code{
        font-weight:400;
        }
        .remote-player{
        color:#FF6442;
        }
        p{
        margin:0;}        `
        this.divEl.innerHTML=`
        <div class="score">
        <p>${localPlayerName}:
            <span>
            ${scoreLocalPlayer}
            </span>
        </p>
        <p class="remote-player">${remotePlayerName}:
            <span>
            ${scoreRemotePlayer}
            </span>
        </p>
        
        
        </div>
          <div class="room">
        <p class="room">Sala</p>
        <p class="room-code" >1234</p>
        
        </div>
        `



        
        this.shadow.appendChild(this.divEl)
        this.shadow.appendChild(this.styleElement)
    }
}
customElements.define("game-header",GameHeader)

}