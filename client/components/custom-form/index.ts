

    
          interface FieldConfig {
  textLabel: string;
  placeHolder: string;
  nameInput:string
}
 export class CustomForm extends HTMLElement{
    constructor(){
        super()

    }
    shadow=this.attachShadow({mode:"open"})
          formEl=document.createElement("form")
         styleElement=document.createElement("style")
         fields:FieldConfig[]=[]
         
    buttonTextContent=this.getAttribute('buttonTextContent') ?? ""

 setFields(fields: FieldConfig[]) {
    this.fields=fields
 }

      createFields() {
        const divContainerTextFields=this.formEl.querySelector(".container_text-fields")
        if(!divContainerTextFields){
            return 
        }
        
   this.fields.forEach((field)=>{
    
    const textFieldEl=document.createElement("text-field")
    textFieldEl.setAttribute("text-label",field.textLabel)
    textFieldEl.setAttribute("placeholder",field.placeHolder)
    textFieldEl.setAttribute("name-input",field.nameInput)

divContainerTextFields.appendChild(textFieldEl)
   })
  }

  
        
    connectedCallback(){
        this.render()
        this.createFields()

    }
   render(){
        this.formEl.classList.add("container")
        this.styleElement.innerHTML=`
        
        .container_text-fields{
        margin-bottom:20px;}

        `
        this.formEl.innerHTML=`
        <div class="container_text-fields">
        </div>
         
        <div class="container-button">
        
        <button-primary>${this.buttonTextContent}</button-primary>
        </div>
         
        `


        
        this.shadow.appendChild(this.formEl)
        this.shadow.appendChild(this.styleElement)
    }
}
customElements.define("custom-form", CustomForm)

