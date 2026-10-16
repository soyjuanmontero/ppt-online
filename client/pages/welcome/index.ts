import { Params } from "../../interfaces"


export function initPageWelcome(params:Params){

    const div=document.createElement('div')
    const style=document.createElement('style')
    style.innerHTML=`

    .container{

    min-height:100dvh;
    overflow:hidden;
   
    display: flex;
    flex-direction: column;
    
     min-width: 375px;
    margin: 0 auto;
    --hands-height: 128px;
    
}
  
@media (min-height: 700px) {
    .container {
        --hands-height: 181px;
    }
}
    @media (max-height: 630px) {
    .container {
        --hands-height: 101px;
    }
}
  .content{
  
  
display: flex;
  flex-direction: column;
  flex:1;
  justify-content:space-between;
  padding-top:73px;

 
  
  }
    @media (min-width: 768px) {
  .content {
  --width-button: 337px;
  }
}
  @media (min-height: 700px) {
    .content {
   justify-content:space-evenly;
       
    }
}  @media (max-height: 630px) {
    .content {
   padding-top:59px;
       
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
.welcome-button{
margin: 0 auto;
    width: 322px;
   
}
   @media (min-width: 768px) {
  .welcome-button {
    width: 336px;
   
  }
}
    .container-new{
    margin-bottom:20px}


    rock-papers {

  margin-top:auto;
    transform: translateY(20px);
    
}

   
    `
    
    
    
    
    div.classList.add("container")
    div.innerHTML=`
<div class="content">
    <div class="welcome-title">
        <h1 >
                Piedra <br>
                Papel o  <br>
                
                Tijera
        </h1>
     </div>
     <div class="welcome-button">
        <div class="container-new">
        
            <button-primary  class="new">Nuevo juego</button-primary>
        </div>
     <div class="container-join">
        
        <button-primary  class="join">Ingresar a una sala</button-primary>
    </div>
</div>
        </div>


        <rock-papers height="var(--hands-height)"></rock-papers>
        
    
    `
    
//   
    const buttonNewEl=div.querySelector(".new")
    const buttonJoinEl=div.querySelector(".join")
    if(buttonNewEl){
        
    

    
    buttonNewEl.addEventListener("click",(e)=>{
        e.preventDefault()
        params.goTo("/create")
      

    })
}
 if(buttonJoinEl){
        
    buttonJoinEl.addEventListener("click",(e)=>{
        e.preventDefault()
        params.goTo("/join")
      

    })
}
    div.appendChild(style)
    

    return {element:div}
   
}