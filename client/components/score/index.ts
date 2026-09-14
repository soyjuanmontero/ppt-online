



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
        const computer=this.getAttribute("computer")?? "0"
        const player=this.getAttribute("player")?? "0"
       
   
        
        
    
        style.innerHTML=`

      .container{
      width:259px;
      
      border:10px solid #000000;
      background-color:#FFFFFF;
      text-align:center;
        padding:10px 30px 0 0;
        display:flex;
        flex-direction:column;
      
        justify-content:center;
        
        }
        .container h1,p{
            font-weight:400;
       font-size:55px;
      margin:0;
        
      }
      .container h1{
      margin-bottom:13px;}
      
      .score{
        text-align:end;
        }
        .score p{
            font-size:45px;
        
      }  


        `
        div.classList.add("container")

        
        div.innerHTML=`
        <h1>Score</h1>
        <div class="score">
        <p>Tu:<span class="fact">${player}</span></p>
        <p>Maquina:<span class="fact">${computer}</span></p>
        
        </div>
         
        `
       
        
        
        this.shadow.appendChild(div)
        this.shadow.appendChild(style)
    }
}
customElements.define("score-el", Score)

}