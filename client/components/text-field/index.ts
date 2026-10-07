export function initComponentTextField(){
class TextField extends HTMLElement{
    constructor(){
        super()

    }
    shadow=this.attachShadow({mode:"open"})
          div=document.createElement("div")
         styleElement=document.createElement("style")
           get value() {
    const input = this.shadowRoot?.querySelector("input");
    return input?.value ?? "";
  }
         
    connectedCallback(){
        this.render()

    }
    
    render(){
        const textLabel=this.getAttribute('text-label') ?? ""
    const nameInput=this.getAttribute('name-input') ?? ""
   const placeHolder=this.getAttribute('placeholder') ?? ""
        this.div.classList.add("container")
        this.styleElement.innerHTML=`
        
        .container{
      
       
        }
   
        .input{
          box-sizing: border-box;
  width: 100%;
         border:solid 10px #182460;
       
        border-radius:10px;
        height:84px;
       text-align:center;
       font-size: 45px;
       
        }
        .text-label{
        margin:0;
        text-align:center;
      font-size: 45px;
        }
      
      

        `
        this.div.innerHTML=`
         
        
            <label class='label'>
                <p class="text-label">${textLabel}</p>
                
                <input class="input" type="text" name="${nameInput}"   placeholder="${placeHolder}"/>
            </label>
        `


        
        this.shadow.appendChild(this.div)
        this.shadow.appendChild(this.styleElement)
    }
}
customElements.define("text-field", TextField)

}