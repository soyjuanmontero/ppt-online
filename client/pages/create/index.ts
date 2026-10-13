import { Params } from "../../interfaces"
import { CustomForm } from "../../components/custom-form"


export function initPageCreate(params:Params){

    const div=document.createElement('div')
    const style=document.createElement('style')
    style.innerHTML=`
    .container{
        min-height:100dvh;
        
    display: flex;
    flex-direction: column;
     
     width: 375px;
    margin: 0 auto;
    --hands-height: 128px;
   
    
    
}   @media (min-width: 768px) {
  .container {
 
         --hands-height: 181px;
        
  
  }
}
    

.content{
  --width-button: 322px;
        --width_text-fields:313px;
        --margin-bottom:20px;
  flex:1;
display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 73px 0 39px;
  
  }
     @media (min-width: 768px) {
  .content {
  --width-button: 337px;
        --width_text-fields:337px;
        --margin-bottom:39px;
         --hands-height: 181px;
        
    padding:0;
    justify-content:space-evenly;
  }
}
    .welcome-title{
    width: 308px;
   
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
.welcome-form{
margin: 0 auto;

  
}

 
   
    `
    
    
    
    
    div.classList.add("container")
    div.innerHTML=`
    <div class="content">
        <div class="welcome-title">
            <h1 > 
                    Piedra Papel o 
                    
                    Tijera
            </h1>
        </div>
        <div class="welcome-form">
            <custom-form buttonTextContent="Empezar" width-button="var(--width-button)" width_text-fields="var(--width_text-fields)" margin-bottom="var(--margin-bottom)"></custom-form>
        </div>
    </div>

        <rock-papers height="var(--hands-height)"></rock-papers>
        
    
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