



export function initComponentScore(){
class Score extends HTMLElement{
    constructor(){
        super()

    }
    shadow=this.attachShadow({mode:"open"})
    connectedCallback(){
        this.render()
       
            }

   
    render(){

       
        const div=document.createElement("div")
        const style=document.createElement("style")
         const nameRemotePlayer=this.getAttribute("name-remote")?? ""
        const nameLocalPlayer=this.getAttribute("name-local")?? ""
        const scoreRemotePlayer=this.getAttribute("score-remote")?? "0"
        const scoreLocalPlayer=this.getAttribute("score-local")?? "0"
       
   
        
        
    
        style.innerHTML=`

      .container{
      width:259px;
   
      border:10px solid #000000;
      background-color:#FFFFFF;
      
     
        display:flex;
        flex-direction:column;
      
        justify-content:center;
        align-items:center;
        
        }
        .container h1,p{
        
            font-weight:400;
       font-size:55px;
      margin:0;
        
      }
      .container h1{
      
      margin-bottom:13px;}
      
      .score{
        align-self:end;
        }
        .score p{
        
            font-size:45px;
        
      }  


        `
        div.classList.add("container")

        
        div.innerHTML=`
        <h1>Score</h1>
        <div class="score">
        <p>${nameLocalPlayer}: <span class="fact">${scoreLocalPlayer}</span></p>
        <p>${nameRemotePlayer}:<span class="fact">${scoreRemotePlayer}</span></p>
        
        </div>
         
        `
       
        
        
        this.shadow.appendChild(div)
        this.shadow.appendChild(style)
    }
}
customElements.define("score-el", Score)

}