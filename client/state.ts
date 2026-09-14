interface Data{
    playerMove:Reglas,
    computerMove:Reglas,
    score:{
        player:number,
        computer:number
    }
    
}

interface State{
data:Data,
listener:Function[]
getState():Data,
setState(newState:Data):void,
subscribe(callback:()=>any):void,
computerSelection():Reglas,
whoWins(computer:Reglas,player:Reglas):Results,
move(playerMove:Reglas):void
}

type Reglas="piedra"| "papel" |"tijera"
type Results= "win" |"lose"|"draw"

const reglas={
    piedra:"tijera",
    papel:"piedra",
    tijera:"papel"
}

const savedState = localStorage.getItem("state");

const defaultData: Data = {
    playerMove: "" as Reglas,    
    computerMove: "" as Reglas,         
    score: {
        player: 0,
        computer: 0            
    }
};
const initialData: Data = savedState ? JSON.parse(savedState) : defaultData;
const state:State={
       data:initialData,

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
    move(playerMove:Reglas){
        

        const computerMove=this.computerSelection()
        const result=this.whoWins(computerMove,playerMove)
       
        const newScore = { ...this.data.score };
    if (result === "win") newScore.player++;
    if (result === "lose") newScore.computer++;
    this.setState({
        playerMove,
        computerMove,
        score: newScore
    })

    }
    

}
export {state}