import { Status } from './status.enum';

export class Gamelogic {

    gameField:  Array<number> = [];
    gameStatus: Status;
    currentTurn: number;
   

    public constructor() {
        this.gameStatus = Status.STOP;
        this.gameField = [ 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    gameStart(): void { 
        this.gameField = [ 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.currentTurn = this.randomPlayerStart();
        this.gameStatus = Status.START;
    }

   randomPlayerStart(): number {
        return Math.floor(Math.random() *2)+1;
    }

    setField(position: number, currentTurn: number): void {
        this.gameField[position] = currentTurn;
    }
}
