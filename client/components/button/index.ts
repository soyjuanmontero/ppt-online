

export function initComponentButton(){
class Button extends HTMLElement{
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
        const textContent=this.getAttribute("textContent")
        
    
        style.innerHTML=`
        
   
        .button-primary{
        font-family:"Odibee Sans", sans-serif;
        font-size:45px;
        color:var(--color-text-boton);
        border:10px solid  var(--color-border-boton);
        border-radius:10px;
        background-color:var(--background-boton);
        height:87px;
        cursor:pointer;
        width:100%;
        }
      

        `

      
        div.innerHTML=` 
        
      <button class="button-primary">${textContent}</button>
         
        `
        this.shadow.appendChild(div)
        this.shadow.appendChild(style)
    }
}
customElements.define("button-primary", Button)

}