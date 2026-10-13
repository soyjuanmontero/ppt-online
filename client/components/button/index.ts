export function initComponentButton(){
class Button extends HTMLElement{
    constructor(){
        super()

    }
    shadow=this.attachShadow({mode:"open"})
          button=document.createElement("button")
         styleElement=document.createElement("style")
         
    connectedCallback(){
        this.render()

    }
    render(){
        
      
      
         this.button.textContent=this.textContent
         this.button.className="button-primary"
         
    
        this.styleElement.innerHTML=`
        
   
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

this.button.addEventListener("click", () => {
   const event = new CustomEvent("button-click", {
  bubbles: true
});
this.dispatchEvent(event)

  });

        
        this.shadow.appendChild(this.button)
        this.shadow.appendChild(this.styleElement)
    }
}
customElements.define("button-primary", Button)

}