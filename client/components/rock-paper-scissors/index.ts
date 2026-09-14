import papel from "url:../../img/papel.svg"
import piedra from "url:../../img/piedra.svg"
import tijera from "url:../../img/tijera.svg"

type Modifications="welcome"| "page-1"|"versus"
type Move="papel"|"piedra"|"tijera"
const imagesMap: Record<Move, string> = {
    papel: papel,
    piedra: piedra,
    tijera: tijera
}

export function initComponentRockPaperScissors(){
class RockPaperScissors extends HTMLElement{
    shadow: ShadowRoot;
    div: HTMLDivElement;
    styleEl: HTMLStyleElement;
    constructor(){
        super()
           this.shadow = this.attachShadow({ mode: "open" });
        
       
        this.div = document.createElement("div");
        this.styleEl = document.createElement("style");
        
        
        this.shadow.appendChild(this.div);
        this.shadow.appendChild(this.styleEl);

    }
   
    connectedCallback(){
        this.render()
        const containerEl=this.shadow.querySelector(".container")
        const isInteractive = this.hasAttribute("interactive")
        if(containerEl && isInteractive){


            this.chooseOne(containerEl)
        }

    }



    chooseOne(element:Element){

element?.addEventListener("click",(event)=>{
      if (this.hasAttribute("disabled")) return;
      const selectedImg=event.target as HTMLElement
      const img = selectedImg.closest("img");
    if (!img) return;
            this.setAttribute("disabled", "true");
            const allImg=element.querySelectorAll("img")
            allImg.forEach((e)=>{
               
                if(e===img){
                  e.classList.add("win")
                }
                else{
                    e.classList.add("lose")
                }
            })
            const choice=img.getAttribute('alt')
            

            const selectUser=new CustomEvent("select-users",{
                detail:{choice:choice},

                 bubbles: true,


            })
            this.dispatchEvent(selectUser)
        })

        }


        
        
        render(){
             
               const       modifications=(this.getAttribute("modifications") as Modifications)?? "welcome"
                    const    computerMove=this.getAttribute('computer') as Move
                   const   playerMove=this.getAttribute('player') as Move
             
            const computerImgSrc = imagesMap[computerMove] || ""
            const playerImgSrc = imagesMap[playerMove] || ""
        
        
   
        
        
    
        this.styleEl.innerHTML=`

        .div {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 184px; /* Altura exacta visible que quieres mostrar (233px - 49px) */
    overflow: hidden;
}

      
.container {
   position: absolute;
    bottom: -49px;
    left: 0;
    width: 100%;
    
    
    z-index: 999;
    display:flex;
    justify-content:center;
    
   
}

.container.welcome{
  
    gap:46px;
  
  }
   .welcome{
    height:131px;
  }
    .container.page-1 img{
        height:233px;}


.container img {
    

    height: auto; /* Mantiene la proporción para que no se deformen */
    object-fit: cover; /* Recorta la imagen automáticamente si no encaja en el espacio */


 
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: translateY(0); /* Estado inicial normal */
}


.container img.win {

  transform: translateY(-45px); /* Sube de forma nítida */
  opacity: 1;
}


.container img.lose {
  transform: translateY(0); 
  opacity: 0.4;
}

    
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

        if(modifications==="welcome"||modifications==="page-1"){

            
            this.div.innerHTML=`
    
            <div class="container ${modifications}">
            
            <img src="${piedra}"  alt="piedra">
    
            <img src="${papel}" alt="papel">
            <img src="${tijera}" alt="tijera">
        </div>
             
            `
           
        }
        if(modifications==="versus"){
          this.div.classList.add("div")

              this.div.innerHTML=`

        
        <div class="up">
        
        <img src="${computerImgSrc}"  alt="${computerMove}">
        </div>

          <div class="down">
        
        <img src="${playerImgSrc}"  alt="${playerMove}">
        </div>
        

       
    
         
        `
      
        }
        
        

    }
}
customElements.define("rock-papers", RockPaperScissors)

}