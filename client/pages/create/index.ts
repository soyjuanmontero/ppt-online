import { Params } from "../../interfaces"
import { CustomForm } from "../../components/custom-form"


export function initPageCreate(params:Params){

    const div=document.createElement('div')
    const style=document.createElement('style')
    style.innerHTML=`

    .container{
    overflow-y: hidden;
    
    
    display: flex;
    flex-direction: column;
    
width: 375px;
    margin: 0 auto;
    


    
    height: 100vh;
    
}
    .welcome-title{
    width: 308px;
    padding:59px 0 18px;

   
  
  
    
    margin: 0 auto;
    
}


    .welcome-title h1{
        text-align: center;
        font-size: 80px;
        font-weight: 700;
        line-height: 0.91;
    margin: 0;
    color: var(--color-title);

}


   
    `
    
    
    
    
    div.classList.add("container")
    div.innerHTML=`
    <div class="welcome-title">
        <h1 > 
                Piedra Papel o 
                
                Tijera
        </h1>
        </div>
        <div class="welcome-form">
    <custom-form buttonTextContent="Empezar"></custom-form>
        </div>


        <rock-papers></rock-papers>
        
    
    `
    const formEl=div.querySelector("custom-form") as CustomForm




    formEl.setFields([{
        "textLabel":"Tu Nombre",
        "placeHolder":"",
        "nameInput":"name"
    }

    ])

    div.appendChild(style)

    return {element:div}
   
}