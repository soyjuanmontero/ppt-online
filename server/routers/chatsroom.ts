import express from 'express'
import { dbRealtime, dbFirestore } from '../db'
import { nanoid ,customAlphabet,} from "nanoid";






const router=express.Router()
const userCollections=dbFirestore.collection('users')
const roomsCollections=dbFirestore.collection("rooms")
const roomsRef=dbRealtime.ref('rooms')

type Reglas="piedra"| "papel" |"tijera"
interface user{
    name:string,
    choice:Reglas,
    online:boolean,
    ready:boolean,

}

const reglas={
    piedra:"tijera",
    papel:"piedra",
    tijera:"papel"
}

const whoWins=(player1:[string,user],player2:[string,user]):string=>{
    const userIdPlayer1:string=player1[0]
    const dataPlayer1:user=player1[1]
     const userIdPlayer2:string=player2[0]
    const dataPlayer2:user=player2[1]
    const choicePlayer1:Reglas=dataPlayer1.choice
   
    
   

        if(dataPlayer1.choice===dataPlayer2.choice){
            
            return "draw"
        }
        else if(reglas[choicePlayer1]===dataPlayer2.choice){
           

           
            return userIdPlayer1
        }
        else{
           
            return userIdPlayer2
        }


    }
    const updateHistory=(winnerId:string,obj:any)=>{
    console.log(obj[winnerId])
  
    if(obj[winnerId]|| obj[winnerId]===0){

        obj[winnerId]+=1
       
    }
        
    }



router.post("/:userId",async (req,res)=>{
    
    try{
        const {userId}=req.params
        const {userName}=req.body
        

              const userSnapShot= await userCollections.doc(userId).get()
 if(!userSnapShot.exists){

     return res.status(401).json({ message: "Usuario no registrado" });
 }
        const nanoid = customAlphabet("1234567890abcdef", 4);
        
         const roomShortId = nanoid(); 
         const newRoomRef=roomsRef.push()
         const roomLongId=newRoomRef.key
         if(!roomShortId){
         return res.status(400).json({ message: "Eroor al crear la sala intente nuevamente" });

         }

 
         await newRoomRef.set({
            playerCount:1,

            users:{
                [userId]:{
                    userName,
                    online:true,
                    ready:false

                }

            }
           })
         await roomsCollections.doc(roomShortId).set({
            roomLongId
         })
          return res.status(201).json({
        message:"La sala a sido creada correctamente",
        roomShortId,
        roomLongId
        
       })


        
        



    }catch(error){
         console.error("Error en el registro:", error);
        return res.status(500).json({ error: "Error interno del servidor" });

    }
    
})
router.get("/:roomShortId", async (req,res)=>{
    try{
  
    const {roomShortId}=req.params
   

    const roomSnapShot= await roomsCollections.doc(roomShortId).get()
 if(!roomSnapShot.exists){

     return res.status(401).json({ message: "codigo invalido la sala no existe" 
     })
 }

 return res.status(200).json(     
        roomSnapShot.data()
 )
  
    }
    catch(error){
        console.error("Error al buscar la sala:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
   

})
router.put("/:userId/join",async(req,res)=>{
    try{
        const {userId}=req.params
    const {roomLongId,userName}=req.body

    if (!roomLongId) {
            return res.status(400).json({ message: "Faltan datos requeridos (roomLongId)" });
        }

      const userSnapShot= await userCollections.doc(userId).get()
 if(!userSnapShot.exists){

     return res.status(401).json({ message: "Usuario no registrado" });
 }

 const newRoomRef=roomsRef.child(roomLongId)
 
 const roomSnapshot=await newRoomRef.get()
 
 
 if(roomSnapshot.val().users[userId]){
     return res.status(200).json({ message: "El usuario ya se encuentra dentro de la sala" })
 }
 

 
 
 let {playerCount}=roomSnapshot.val()
 
 if(playerCount<2){
    playerCount+=1
    
   await newRoomRef.update({
        playerCount:playerCount,
            [`users/${userId}`]:{
                userName,
            online:true,
            ready:false
        }
        

    })
      return res.status(200).json({ 
               message:"El usuario a ingresado a la sala"
            });
   }


 
 else{
      return res.status(403).json({
           message:" Acceso denegado, La sala esta llena"
        })

 }



    }
    catch(error){
          console.error("Error al buscar la sala:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
    

})
router.put("/:userId/start", async (req,res)=>{
    try{
        
        const {userId}=req.params
            const {roomLongId}=req.body

    if (!roomLongId) {
            return res.status(400).json({ message: "Faltan datos requeridos (roomLongId)" });
        }
          const userSnapShot= await userCollections.doc(userId).get()
 if(!userSnapShot.exists){

     return res.status(401).json({ message: "Usuario no registrado" });
 }
  const userRef=roomsRef.child(roomLongId).child("users").child(userId)
  
  const userRefSnapshot=await userRef.get()
  console.log(userRefSnapshot.val())
  if(!userRefSnapshot.val()){
     return res.status(401).json({ message: "Este Usuario no se encuentra en la sala" });

  }
  const ready=userRefSnapshot.val().ready

  if(!ready){
      
      await userRef.update({
           ready:true
       })
         return res.status(200).json({ 
               message:"El usuario esta listo para jugar"
            });
       
    }
    return res.status(400).json({ message: "El usuario ya está listo y no puede unirse nuevamente." });


  


    }
    catch(error){
           console.error("Error al buscar la sala:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
})
router.put("/:userId/choice", async (req,res)=>{
    try{
        
        const {userId}=req.params
            const {roomLongId,choice}=req.body

    if (!roomLongId&& !choice) {
            return res.status(400).json({ message: "Faltan datos requeridos (roomLongId y choice)" });
        }
          const userSnapShot= await userCollections.doc(userId).get()
 if(!userSnapShot.exists){

     return res.status(401).json({ message: "Usuario no registrado" });
 }
  const userRef=roomsRef.child(roomLongId).child("users").child(userId)
  
  const userRefSnapshot=await userRef.get()
 
  if(!userRefSnapshot.val()){
     return res.status(401).json({ message: "Este Usuario no se encuentra en la sala" });

  }
   const ready=userRefSnapshot.val().ready

  
     if (!ready) {
    return res.status(400).json({ message: "El usuario debe estar listo para iniciar el juego." });
}

      await userRef.update({
           
           choice
       })
        return res.status(200).json({ 
                  message:"ok"
               });

  


  
 


    }
    catch(error){
           console.error("Error al buscar la sala:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
})

router.put("/:roomLongId/history", async (req,res)=>{
    try{
        
       
            const {roomLongId}=req.params
            const currentRoomRef=roomsRef.child(roomLongId)
             const currentRoomSnaphopt= await currentRoomRef.get()
             const dataRoom=currentRoomSnaphopt.val()
        if(!dataRoom){
    return res.status(404).json({
        message:"error la sala no existe"
    })
 }
    
        const {users}=dataRoom
        
        
        if(!users){
             return res.status(400).json({ message: "Error no hay usuarios en la sala " });
        }
        const keyUsers=Object.keys(users)

const players=Object.entries(users as Record<string, any>)

const verifyData=players.every(([userId,data ])=>{
    return data.choice!==undefined && data.ready===true && data.online===true

})


if(!verifyData){
     return res.status(400).json({ message: "error no se puede realizar esta operacion" });
}
const [player1 , player2]=players
const winnerId=whoWins(player1,player2)





  const {history}=currentRoomSnaphopt.val()


  
  
  if(!history){
    
    const userIdPlayer1=player1[0]
    const userIdPlayer2=player2[0]
      const newHistory={
        [userIdPlayer1]:0,
        [userIdPlayer2]:0

      }
      
      
    updateHistory(winnerId,newHistory)
    
       await currentRoomRef.update({
                history:newHistory
             })
              return res.status(200).json({ 
                        winnerId,
                        
                     });

  }
    updateHistory(winnerId,history)
    
       await currentRoomRef.update({
                history:history
             })
              return res.status(200).json({ 
                        winnerId,
                        
                     });
  

  


  
 


    }
    catch(error){
           console.error("Error al buscar la sala:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
})
export default router