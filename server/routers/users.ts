import { dbFirestore,dbRealtime } from '../db'
import express from 'express'
import { v4 as uuidv4 } from 'uuid';


const router=express.Router()


const userCollections=dbFirestore.collection('users')
const roomsCollections=dbFirestore.collection("rooms")

console.log(dbFirestore)

router.post("/",async(req,res)=>{
    try{


        const {userName}=req.body
        const id =uuidv4()
        if(!userName){
         return res.status(400).json({ message: "El campo Nombre es obligatorio" });
        }
       await userCollections.doc(id).set({
        userName
       })
       return res.status(201).json({
        message:"usuario creado correctamente",
        userName,
        id
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