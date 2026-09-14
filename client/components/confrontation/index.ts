import papel from "url:../../img/papel.svg"
import piedra from "url:../../img/piedra.svg"
import tijera from "url:../../img/tijera.svg"


type Move="papel"|"piedra"|"tijera"
const imagesMap: Record<Move, string> = {
    papel: papel,
    piedra: piedra,
    tijera: tijera
}


export function initComponentConfrontation(){
class Confrontation extends HTMLElement{
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
        const computerMove=this.getAttribute('computer') as Move
        const playerMove=this.getAttribute('player') as Move


        const computerImgSrc = imagesMap[computerMove] || ""
        const playerImgSrc = imagesMap[playerMove] || ""
     
   
        
        
    
        style.innerHTML=`
     
        
        .up{
          transform: scaleY(-1);
      
            height:331px;
             position: fixed;
            top:-70px;
             width:100%;
             display:flex;
             justify-content:center;
          
          
          }
        
.down {
transform: scaleY(1);
  position: fixed;
  bottom: -70px; 
  height:331px;
  width: 100%;
  display: flex;
  justify-content: center;

}
  
        

          
 
 


        `

        
        div.innerHTML=`

        
        <div class="up">
        
        <img src="${computerImgSrc}"  alt="${computerMove}">
        </div>

          <div class="down">
        
        <img src="${playerImgSrc}"  alt="${playerMove}">
        </div>
        

       
    
         
        `
       
        
        
        this.shadow.appendChild(div)
        this.shadow.appendChild(style)
    }
}
customElements.define("confrontation-el", Confrontation)

}