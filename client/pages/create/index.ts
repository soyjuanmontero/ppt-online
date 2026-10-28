import { Params } from "../../interfaces"
import { CustomForm } from "../../components/custom-form"
import { state } from "../../state"

export function initPageCreate(params:Params){

    const div=document.createElement('div')
    const style=document.createElement('style')
    style.innerHTML=`
    .container{
        min-height:100dvh;
        overflow:hidden;
    display: flex;
    flex-direction: column;
     
     width: 375px;
    margin: 0 auto;
    --hands-height: 128px;
   
    
    
}   @media (min-height: 700px) {
  .container {
 
         --hands-height: 181px;
        
  
  }
}  @media (max-height: 630px) {
    .container {
        --hands-height: 101px;
    }
}
    

.content{
  --width-button: 322px;
        --width_text-fields:313px;
        --margin-bottom:20px;
  flex:1;
display: flex;
  flex-direction: column;
  justify-content:space-between;
  padding-top:49px;
  
  
  }
     @media (min-width: 768px) {
  .content {
  --width-button: 337px;
        --width_text-fields:337px;}
} @media (min-height: 700px) {
    .content {
   justify-content:space-evenly;
       
    }
}  @media (max-height: 630px) {
    .content {
   padding-top:29px;
       
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

  rock-papers {

  
    transform: translateY(20px);
}

   
    `
    
    
    
    
    div.classList.add("container")
    div.innerHTML=`
    <div class="content">
        <div class="welcome-title">
            <h1 > 
                    Piedra <br>
                     Papel o <br>
                    
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
formEl.addEventListener("form-submit",async (e)=>{
    const {gameAction}=state.getState()
    const value=(e as CustomEvent<string>).detail
    if(!value){
        console.log("el campo nombre esta vacio")
        return 
    }
     
       const resCreateUser:any=await state.createUser(value)
      if(!resCreateUser.succes){
        console.error(resCreateUser.message)
        return
      }
      
      console.log(resCreateUser.message)

      if(gameAction==="create"){
          const resCreateRoom:any=await state.createRoom()
          if(!resCreateRoom.succes){
            console.error(resCreateRoom.message)
            return
        }
        console.log(resCreateRoom.message)


      }
      else{
         const resSaveLongId:any= await state.getAndSaveRoomLongId()
          if(!resSaveLongId.succes){
            console.error(resSaveLongId.message)
            return
        }
        
        const resJoinRoom:any= await state.joinTheRoom()
          if(!resJoinRoom.succes){
            console.error(resJoinRoom.message)
            return
        }
        console.log(resJoinRoom.message)

      }
      


        params.goTo("/lobby")
})



    formEl.setFields([{
        "textLabel":"Tu Nombre",
        "placeHolder":"",
        "nameInput":"name"
    }

    ])
    

    div.appendChild(style)

    return {element:div}
   
}