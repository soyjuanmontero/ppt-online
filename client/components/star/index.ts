

export function initComponentStar(){
class ResultStar extends HTMLElement{
    constructor(){
        super()

    }
    shadow=this.attachShadow({mode:"open"})
    connectedCallback(){
        this.render()

    }
    render(){
        type Result="win"| "lose"
        const div=document.createElement("div")
        const style=document.createElement("style")
        const resultAttribute:Result=(this.getAttribute("result") as Result)?? "win"
    
             const translation: Record<Result, string> = {
                win: "Ganaste",
                lose: "Perdiste"
            }
            
            // Aquí obtenemos el texto final en español
            const textResult = translation[resultAttribute] 
        
    
        style.innerHTML=`
         :host {
          display: inline-block;
          
          --color-fondo: var(--color-win);
          
        }
        
           :host([result="lose"]) {
              --color-fondo: var(--color-lose);
            }
         

        `

        div.classList.add("container")
        div.innerHTML=`
        <svg id="star" width="254" height="260" viewBox="0 0 362 362" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M205.807 61.832L207.368 62.6826L209.116 62.3555L319.994 41.6543L299.293 152.533L298.967 154.28L299.817 155.842L353.768 254.896L241.92 269.472L240.156 269.702L238.935 270.993L161.399 352.912L112.975 251.043L112.212 249.438L110.605 248.674L8.73535 200.248L90.6553 122.714L91.9473 121.492L92.1768 119.729L106.752 7.87988L205.807 61.832Z" fill="var(--color-fondo)" stroke="black" stroke-width="10"/>
  <text 
    x="181" 
    y="181" 
    text-anchor="middle" 
    dominant-baseline="central"
    style="font-family: sans-serif; font-size: 45px; fill:white; font-weight: bold;">
    ${textResult}
  </text>
</svg>
        
         
        `

            const starEl=div.querySelector("#star")
            
      
        
        
        this.shadow.appendChild(div)
        this.shadow.appendChild(style)
    }
}
customElements.define("result-star", ResultStar)


}