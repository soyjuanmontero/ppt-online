import { Params } from "../../interfaces"
import { CustomForm } from "../../components/custom-form"


export function initPageJoin(params:Params){

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
    padding:53px 0 39px;

   
  
  
    
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
.welcome-button{
margin: 0 auto;
    width: 322px;
   margin-bottom:39px
}
    .container-new{
    margin-bottom:20px}



   
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
    <custom-form buttonTextContent="Ingresar a la sala"></custom-form>
        </div>


        <rock-papers></rock-papers>
        
    
    `
    const formEl=div.querySelector("custom-form") as CustomForm




    formEl.setFields([{
        "textLabel":"",
        "placeHolder":"Codigo",
        "nameInput":"code"
    }

    ])

    div.appendChild(style)

    return {element:div}
   
}