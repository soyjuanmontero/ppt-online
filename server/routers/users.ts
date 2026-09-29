import { dbFirestore,dbRealtime } from '../db'
import express from 'express'
import { v4 as uuidv4 } from 'uuid';


const router=express.Router()


const userCollections=dbFirestore.collection('users')
const roomsCollections=dbFirestore.collection("rooms")



router.post("/",async(req,res)=>{
    try{


        const {userName}=req.body
        const userId =uuidv4()
        if(!userName){
         return res.status(400).json({ message: "El campo Nombre es obligatorio" });
        }
       await userCollections.doc(userId).set({
        userName
       })
       return res.status(201).json({
        message:"usuario creado correctamente",
        
        userId
       })
    }
    catch (error:any) {
        console.error("Error al crear usuario:", error);
        return res.status(500).json({ 
            message: "Error interno del servidor", 
            error: error.message 
        });
    }

})


export default router