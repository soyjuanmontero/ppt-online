import { dbFirestore,dbRealtime } from '../db'
import express, { Router } from 'express'


const router=express.Router()


const userCollections=dbFirestore.collection('users')
const roomsCollections=dbFirestore.collection("rooms")



Router


export default router