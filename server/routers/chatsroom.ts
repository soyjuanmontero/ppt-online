import express from 'express'
import { dbRealtime, dbFirestore } from '../db'
import { nanoid ,customAlphabet,} from "nanoid";
import { stringify } from 'querystring';

// import { v4 as uuidv4 } from 'uuid';




const router=express.Router()
const userCollections=dbFirestore.collection('users')
const roomsCollections=dbFirestore.collection("rooms")
const roomsRef=dbRealtime.ref('rooms')



router.post("/",async (req,res)=>{
    try{
        const nanoid = customAlphabet("1234567890abcdef", 4);
        const {userId,userName}=req.body
         const roomShortId = nanoid(); 
         const newRoomRef=roomsRef.push()
         const roomLongId=newRoomRef.key
         if(!roomShortId||!userName||!userId){
         return res.status(400).json({ message: "Eroor al crear la sala intente nuevamente" });

         }
         const snapShot= await userCollections.doc(userId).get()
 if(!snapShot.exists){
    return res.status(401).json({ message: "Usuario no registrado" });
 }
         await newRoomRef.set({
           
            player1:{
                userName,
                userId
            }

         })
         await roomsCollections.doc(roomShortId).set({
            roomLongId
         })
          return res.status(201).json({
        message:"La sala a sido creada correctamente",
        roomShortId
        
       })


        
        



    }catch(error){
         console.error("Error en el registro:", error);
        return res.status(500).json({ error: "Error interno del servidor" });

    }
    
})
router.get("/:roomId", async (req,res)=>{
    try{
  const {userId}=req.query
    const roomShortId=req.params.roomId
    if(typeof(userId)!="string"){
        return {message:"user id no valido"}
    }
    const userSnapShot= await userCollections.doc(userId).get()
 if(!userSnapShot.exists){

     return res.status(401).json({ message: "Usuario no registrado" });
 }
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
router.post("/:userId/join",async(req,res)=>{
    try{
        const {userId}=req.params
    const {roomLongId,userName}=req.body

      const userSnapShot= await userCollections.doc(userId).get()
 if(!userSnapShot.exists){

     return res.status(401).json({ message: "Usuario no registrado" });
 }
 const currentRoom=roomsRef.child(roomLongId)
   const snapshot = await currentRoom.once('value');
   if(!snapshot.exists){
     return res.status(404).json({ 
                
                message: "La referencia no existe" 
            })
   }    
   const player2=snapshot.val().player2
   if(player2){
    return res.status(403).json({
        message:" prohbido el acceso, La sala esta full"
    })
   }
    await currentRoom.set({
           
            player2:{
                userName,
                userId
            }

         })
   

   return res.status(200).json({ 
               message:"el usuario a ingresado a la sala"
            });

    }
    catch(error){
          console.error("Error al buscar la sala:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
    

})

export default router