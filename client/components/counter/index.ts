

export function initComponentCounter(){

class Counter extends HTMLElement{
    constructor(){
        super()

    }
    shadow=this.attachShadow({mode:"open"})
    connectedCallback(){
        this.render()
        this.starCounter()
        
        

    }
    disconnectedCallback() {
  
    if (this.interval) {
        clearInterval(this.interval);
        console.log("El contador se eliminó de la pantalla. Intervalo frenado con éxito.");
    }
}
      
     div=document.createElement("div")
      perimeter=2*Math.PI*40
         initialValue=3
         currentTime=this.initialValue
         interval:any
    starCounter(){
        const circleEl:any=this.div.querySelector(".mi-circle")
        const numberEl=this.div.querySelector(".number")
       

          this.interval=setInterval(() => {
           this.currentTime--
           
          
               if(numberEl){
    
    
                   numberEl.textContent=this.currentTime.toString()
               }
                 
        const fractionPercentage = (this.initialValue - this.currentTime) / this.initialValue;
        const paintCircle = this.perimeter * fractionPercentage;


        
        
        if(circleEl){
            
            
            circleEl.style.strokeDashoffset = paintCircle;
        }
    
            if(this.currentTime===0){

                

                clearInterval(this.interval)
            const timeOut=new CustomEvent("time-out",{
                bubbles:true

                
            })
            this.dispatchEvent(timeOut)
            }

         
            
          
            
            
            
        }, 1000);
        
    }
    render(){
        
       
        const style=document.createElement("style")
        
        
        
    
        style.innerHTML=`
        
.mi-circle {
  fill: transparent; /* El centro del círculo queda transparente */
  stroke: black;      /* El color del borde es negro */
  stroke-width: 8;    /* Grosor del borde (ajústalo si lo ves muy gordo o flaco) */
  stroke-dasharray: ${this.perimeter};
  stroke-dashoffset: 0;
   /* NUEVA LÍNEA: Rotar para que empiece desde arriba */
  transform: rotate(-90deg);
  
  /* IMPORTANTE: Le dice al navegador que gire el círculo sobre su propio centro */
  transform-origin: 50px 50px;
   /* Duración de 1 segundo de forma lineal (constante) */
  transition: stroke-dashoffset 1s linear;
}
  .number {
         
          font-size: 1.5rem;
          font-weight: bold;
          fill:black;
        }
      

        `

      
        this.div.innerHTML=` 
        
        <div >
         <svg viewBox="0 0 100 100" width="243" height="243">
  <circle cx="50" cy="50" r="40" class="mi-circle" />
  <text x="50" y="50" text-anchor="middle" dominant-baseline="central" class="number">
  ${this.initialValue}
  </text>
  </svg>
      </div>
        `
        this.shadow.appendChild(this.div)
        this.shadow.appendChild(style)
    }
}
customElements.define("counter-img", Counter)

}