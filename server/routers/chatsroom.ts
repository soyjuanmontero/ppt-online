import express from 'express'
import { dbRealtime, dbFirestore } from '../db'
// import { v4 as uuidv4 } from 'uuid';



const router=express.Router()
const userCollections=dbFirestore.collection('users')
const roomsCollections=dbFirestore.collection("rooms")
const roomsRef=dbRealtime.ref('rooms')



router.post("/user",(req,res)=>{
    const {name}=req.body
    
})

export default router