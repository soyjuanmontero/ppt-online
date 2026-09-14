import { initializeApp,cert, ServiceAccount } from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore'
import {getDatabase} from 'firebase-admin/database'
import dotenv from 'dotenv'

dotenv.config()
const {
  PROJECT_ID,
  CLIENT_EMAIL,
  PRIVATE_KEY
} = process.env;

if (!PROJECT_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
  throw new Error('Faltan variables de entorno de Firebase');
}

const serviceAccount:ServiceAccount = {
   
    projectId: PROJECT_ID,
   
    privateKey: PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: CLIENT_EMAIL,
   

  
    
    
  
} 


initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://ppt-online-dd028-default-rtdb.firebaseio.com"
});

const dbFirestore=getFirestore()
const dbRealtime=getDatabase()
export {dbFirestore,dbRealtime}