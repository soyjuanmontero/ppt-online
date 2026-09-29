import {  ref, onValue, push } from "firebase/database";
import { db } from "./db";
import { BlobOptions } from "buffer";


const API_BASE_URL = process.env.PUBLIC_API_URL
interface User{
    userName:string,
    userId:string,
    choice?:Reglas
    online?:boolean,
    ready?:boolean
}
interface Room{
  roomShortId?:string,
  roomLongId?:string

}
interface Data{
    localPlayer:User,
    remotePlayer:User
    playersReadyToGame:boolean
    room:Room
   
    score:{
        player:number,
        computer:number
    }
    
}

interface State{
data:Data,
listener:Function[]
getState():Data,
setState(newState:Partial<Data>):void,
subscribe(callback:()=>any):void,
computerSelection():Reglas,
whoWins(computer:Reglas,player:Reglas):Results,
// move(playerMove:Reglas):void,
createUser(userName:string):Promise<object>,
createRoom():Promise<object>,
getAndSaveRoomLongId():Promise<object>
joinTheRoom():Promise<object>,
listenToTheRoom():any,
updatePlayer(player: Partial<User> & { userId: string }) :void
}

type Reglas="piedra"| "papel" |"tijera"
type Results= "win" |"lose"|"draw"

const reglas={
    piedra:"tijera",
    papel:"piedra",
    tijera:"papel"
}

// const savedState = localStorage.getItem("state");

const defaultData: Data = {
    localPlayer:{
        userName:"",
        userId:"",
        

        
    },remotePlayer:{
        userName:"",
        userId:"",
       
    },playersReadyToGame:false,
    room:{
      roomShortId:"",
      roomLongId:""
    },
          
    score: {
        player: 0,
        computer: 0            
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
    // localStorage.setItem("state", JSON.stringify(this.data))

        for(let cb of this.listener){
            cb()
        }

    },
    subscribe(callback:()=>{}){

        this.listener.push(callback)

        return () => {
        this.listener = this.listener.filter(l => l !== callback);
    };
    },
    computerSelection(){
        const play: Reglas[] = ["piedra", "papel", "tijera"];
            return  play[Math.floor(Math.random() * play.length)];
      
       
        
      
    },
    whoWins(computer,player){
        

        if(computer===player){
            
            return "draw"
        }
        else if(reglas[player]===computer){
           

           
            return "win"
        }
        else{
           
            return "lose"
        }


    },
    // move(playerMove:Reglas){
        

    //     const computerMove=this.computerSelection()
    //     const result=this.whoWins(computerMove,playerMove)
       
    //     const newScore = { ...this.data.score };
    // if (result === "win") newScore.player++;
    // if (result === "lose") newScore.computer++;
    // this.setState({
    //     playerMove,
    //     computerMove,
    //     score: newScore
    // })

    // },
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
          userName
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
  
  
  
  if (!snapshot.exists()) {
     return {message:"No hay datos en esta ruta."}
  } 
    Object.entries(users as Record<string, User>).forEach(([userId,userData])=>{
      
      this.updatePlayer({
        ...userData,
        userId
      })
    
      
    })
  
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
      this.listenToTheRoom()
    return {succes:true, message:resultado.message}
    
    
  } catch (error) {
    console.error('Error:', error);
    return { error}
  }


    },
    updatePlayer(player: Partial<User> & { userId: string }) {
  const state = this.getState();
  // console.log(state)
  // console.log(player.userId)
  // console.log(state.localPlayer)

  if (player.userId === state.localPlayer.userId) {
    
   
    this.setState({
      localPlayer: {
        ...state.localPlayer,
        ...player
      }
    });
  } else {
    this.setState({
      remotePlayer: {
        ...state.remotePlayer,
        ...player
      }
    });
  }
}

}
export {state}