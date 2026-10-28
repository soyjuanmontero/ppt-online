import {  ref, onValue, push } from "firebase/database";
import { db } from "./db";



const API_BASE_URL = process.env.PUBLIC_API_URL
interface User{
    userName?:string,
    userId:string,
    choice?:Reglas
    online:boolean,
    ready:boolean
}
interface Room{
  roomShortId?:string,
  roomLongId?:string

}
type GameAction="create"|"join"
interface Data{
    localPlayer:User,
    remotePlayer:User,
    gameAction?:GameAction
    playersOnline: boolean;
    playersReadyToGame:boolean
    room:Room,
    winner?:string
   
    score:{
        localPlayer:number,
        remotePlayer:number
    }
    
}

interface State{
data:Data,
listener:Function[]
getState():Data,
setState(newState:Partial<Data>):void,
subscribe(callback:()=>void): () => void
computerSelection():Reglas,
whoWins():Results,
// move(playerMove:Reglas):void,
createUser(userName:string):Promise<object>,
createRoom():Promise<object>,
getAndSaveRoomLongId():Promise<object>
joinTheRoom():Promise<object>,
listenToTheRoom():any,
updatePlayer(users: Record<string, User>) :void,
readytoPlay():Promise<object>
choseAMove(choice:Reglas):Promise<object>
bothPlayersOnline(localPlayer:User, remotePlayer:User):boolean
bothPlayersReady(localPlayer:User, remotePlayer:User):boolean
updateHistory():Promise<object>
resetChoices() :Promise<object>
}

type Reglas="piedra"| "papel" |"tijera"
type Results= "win" |"lose"

const reglas={
    piedra:"tijera",
    papel:"piedra",
    tijera:"papel"
}

const savedState = localStorage.getItem("state");

const defaultData: Data = {
    localPlayer:{
        
        userId:"",
        online:false,
        ready:false,
        

        
    },remotePlayer:{
      
      
        userId:"",
        online:false,
        ready:false,
        
       
    },
    playersOnline: false,
    playersReadyToGame:false,
    room:{
      roomShortId:"",
      roomLongId:""
    },
          
    score: {
        localPlayer: 0,
      remotePlayer: 0            
    }
};
// const initialData: Data = savedState ? JSON.parse(savedState) : defaultData;
const state:State={
       data:defaultData,

    listener:[],
    
    getState(){
        
        return this.data
    },
    setState(newState){
          this.data = {
        ...this.data,
        ...newState
    };
   
    localStorage.setItem("state", JSON.stringify(this.data))

        for(let cb of this.listener){
            cb()
        }

    },
subscribe(callback: () => void): () => void {
    this.listener.push(callback);

    return () => {
        this.listener = this.listener.filter(l => l !== callback);
    };
},
    computerSelection(){
        const play: Reglas[] = ["piedra", "papel", "tijera"];
            return  play[Math.floor(Math.random() * play.length)];
      
       
        
      
    },
    whoWins(){
        const {localPlayer, winner}=state.getState()
        console.log(winner)
        console.log(localPlayer.userId)

        if(winner===localPlayer.userId){
            
            return "win"
        }
       
        
           
            return "lose"
        


    },
   
   async  createUser(userName){
       try {
             

           if (!userName) {
      return {message:"debes escribir tu nombre para jugar"}
      
    }
    const res = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName
      }) 
    });

   

    const resultado = await res.json();
      const {message}=resultado
      if (!res.ok) {
          return{message}
      
    }
    const {userId}=resultado
    
      
      this.setState({
        localPlayer:{
          userId,
          userName,
          online:false,
          ready:false
        }
      })
      return {succes:true, message}
    
    
    
  } catch (error) {
    console.error('Error:', error);
    return { message:error}
  }


    },
   async createRoom(){
           try {
            const {userId,userName}=this.getState().localPlayer
           
           if (!userId|| !userName) {
      return {message:"Faltan datos  necesarios para realizar esta peticion (userId, userName)"}
      
    }
    const res = await fetch(`${API_BASE_URL}/chatRoom/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({
        userName
      }) ,
    
    });

   

    const resultado = await res.json();
   
    
      const {message}=resultado
      if (!res.ok) {
          return{message}
      
    }
      const {roomShortId,roomLongId}=resultado
    
    
    
      this.setState({
        room:{
          roomShortId,
          roomLongId
        }

      })
  

      return {succes:true, message}
    
   
    
    
  } catch (error) {
    console.error('Error:', error);
    return { error}
  }

    },
  async   getAndSaveRoomLongId(){
               try {
                const {roomShortId}=this.getState().room
           if (!roomShortId) {
      return {message:"faltan datos(roomShortId)"}
      
    }
    
    const res = await fetch(`${API_BASE_URL}/chatRoom/${roomShortId}`, );
    const resultado = await res.json();
    const {message}=resultado
      if (!res.ok) {
          return{message}
      
    }
    const {roomLongId}=resultado
     
      this.setState({
        room:{
          ...this.getState().room,
          roomLongId
        }

      })

      return {succes:true, message}
    
    
    
    
    
  } catch (error) {
    console.error('Error:', error);
    return { error}
  }

    },
    listenToTheRoom(){
      const {roomLongId}=this.getState().room
      const roomRef=ref(db,`rooms/${roomLongId}`)
const unsubscribe = onValue(roomRef, (snapshot) => {

  const data = snapshot.val();
  const { users } = data;
  console.log(data)


  
 
  
  
  if (!snapshot.exists()) {
     return {message:"No hay datos en esta ruta."}
  } 
    
      
      this.updatePlayer(data)
      return {message:"ok"}
    
      
    
  
}, (error) => {
  console.error("Error al leer los datos:", error);
});
return unsubscribe

    },

    
    async joinTheRoom(){
             try {
              const currentState=this.getState()
              const {userId,userName}=currentState.localPlayer
              const {roomLongId}=currentState.room
                if(!userId&&roomLongId){
                    return {message:"faltan datos (userId,roomLongId)"}
                }
       
    const res = await fetch(`${API_BASE_URL}/chatRoom/${userId}/join`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        roomLongId,
        userName
      }) 
    });

   

    const resultado = await res.json();
     const {message}=resultado
      if (!res.ok) {
          return{message}
      }
      
    return {succes:true, message:resultado.message}
    
    
  } catch (error) {
    console.error('Error:', error);
    return { error}
  }


    },
    updatePlayer(data:any) {
      const users:Record<string, User>=data.users
      const history=data.history
     
     
  const state = this.getState();
let localPlayer = state.localPlayer;
  let remotePlayer = state.remotePlayer;

  Object.entries(users).forEach(([userId, userData]) => {
    const player = { ...userData, userId };

    if (userId === localPlayer.userId) {
      localPlayer = { ...localPlayer, ...player , choice:player.choice };
    } else {
      remotePlayer = { ...remotePlayer, ...player , choice:player.choice };
    }
  });
const playersReadyToGame = this.bothPlayersReady(localPlayer, remotePlayer);
const playersOnline = this.bothPlayersOnline(localPlayer, remotePlayer);
let {score}=state
if(history){
let scoreLocalPlayer=0
let scoreRemotePlayer=0

  Object.entries(history).forEach(([userId, value]) => {


    if (userId === localPlayer.userId) {
     scoreLocalPlayer=Number(value)
    } else {
      scoreRemotePlayer=Number(value)
    }
  });
   score={
    localPlayer:scoreLocalPlayer,
    remotePlayer:scoreRemotePlayer
  }
}
  this.setState({
    localPlayer,
    remotePlayer,
    playersOnline,
    playersReadyToGame,
    score
  });
  
},
async readytoPlay(){

   try {
              const currentState=this.getState()
              const {userId}=currentState.localPlayer
              const {roomLongId}=currentState.room
                if(!userId&&!roomLongId){
                    return {message:"faltan datos (userId,roomLongId)"}
                }
       
    const res = await fetch(`${API_BASE_URL}/chatRoom/${userId}/start`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        roomLongId
      }) 
    });

   

    const resultado = await res.json();
     const {message}=resultado
      if (!res.ok) {
          return{message}
      }
      
    return {succes:true, message}
    
    
  } catch (error) {
    console.error('Error:', error);
    return { error}
  }

},
async choseAMove(choice){
   try {
              const currentState=this.getState()
              const {userId}=currentState.localPlayer
              const {roomLongId}=currentState.room
                if(!userId&&!roomLongId&& !choice){
                    return {message:"faltan datos (userId,roomLongId,choice)"}
                }
       
    const res = await fetch(`${API_BASE_URL}/chatRoom/${userId}/choice`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        roomLongId,
        choice
      }) 
    });

   

    const resultado = await res.json();
     const {message}=resultado
      if (!res.ok) {
          return{message}
      }
      
    return {succes:true, message}
    
    
  } catch (error) {
    console.error('Error:', error);
    return { error}
  }

},
bothPlayersOnline(localPlayer: User, remotePlayer: User): boolean {
  
  return localPlayer.online && remotePlayer.online;
},
bothPlayersReady(localPlayer: User, remotePlayer: User): boolean {
  
  return localPlayer.ready && remotePlayer.ready;
},

async updateHistory(){

  try {
              const {room}=this.getState()
              
              const {roomLongId}=room
                if(!roomLongId){
                    return {message:"faltan datos (roomLongId)"}
                }
       
    const res = await fetch(`${API_BASE_URL}/chatRoom/${roomLongId}/history`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    
    });

   

    const resultado = await res.json();
     const {message,winnerId}=resultado
      if (!res.ok) {
          return{message}
      }
    state.setState({
      winner:winnerId
    })
    return {succes:true, message}
    
    
  } catch (error) {
    console.error('Error:', error);
    return { error}
  }

  
},
async resetChoices(){
  try {
              const {room , localPlayer, remotePlayer}=this.getState()
              
              const {roomLongId}=room
                if(!roomLongId ){
                    return {message:"faltan datos (roomLongId)"}
                }
                 if(!localPlayer.choice && !remotePlayer.choice ){
                    return {message:"No es posible realizar esta peticion "}
                }
       
    const res = await fetch(`${API_BASE_URL}/chatRoom/${roomLongId}/reset-choice`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    
    });

   

    const resultado = await res.json();
     const {message}=resultado
      if (!res.ok) {
          return{message}
      }
    
    return {succes:true, message}
    
    
  } catch (error) {
    console.error('Error:', error);
    return { error}
  }


}
}
export {state}