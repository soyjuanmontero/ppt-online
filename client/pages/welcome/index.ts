import { Params } from "../../interfaces"


export function initPageWelcome(params:Params){

    const div=document.createElement('div')
    const style=document.createElement('style')
    style.innerHTML=`

    .container{

    min-height:100dvh;
    

    display: flex;
    flex-direction: column;
    
     min-width: 375px;
    margin: 0 auto;
    --hands-height: 128px;
    
}
     @media (min-width: 768px) {
  .container {
    --hands-height: 181px;
  }
}
  .content{
  
  flex:1;
display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 73px 0 39px;
  
  }
    @media (min-width: 768px) {
  .content {
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
          @media (min-width: 768px) {
   .container-new{
    margin-bottom:39px}
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