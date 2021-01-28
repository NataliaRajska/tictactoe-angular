import {Status} from './status.enum';
import {Observable, of} from "rxjs";

export class Gamelogic {

    gameField: number[] = [];
    gameStatus: Status;
    currentTurn: number;
    winSituationsOne: number[][] = [
        [1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1]
    ]

    winSituationsTwo: number[][] = [
        [2, 2, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 0, 0, 2, 0, 0, 2, 0, 0],
        [0, 2, 0, 0, 2, 0, 0, 2, 0],
        [0, 0, 2, 0, 0, 2, 0, 0, 2],
        [0, 0, 2, 0, 2, 0, 0, 0, 2],
        [2, 0, 0, 0, 2, 0, 0, 0, 2]
    ]

    public constructor() {
        this.gameStatus = Status.STOP;
        this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    gameStart(): void {
        this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.currentTurn = this.randomPlayerStart();
        this.gameStatus = Status.START;
    }

    randomPlayerStart(): number {
        return Math.floor(Math.random() * 2) + 1;
    }

    setField(position: number, value: number): void {
        this.gameField[position] = value;
        console.log(this.gameField);
    }

    getPlayerColorCLass(): string {
        return (this.currentTurn === 2) ? 'player-two' : 'player-one';
    }

    changePlayer(): void {
        this.currentTurn = (this.currentTurn === 2) ? 1 : 2;
    }

    arrayEquals(a: number[], b: number[]): boolean {
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length &&
            a.every((value, index) => value === b[index]);
    }

   checkGameEndFull(): Observable<boolean> {
        let isFull = true;
        if (this.gameField.includes(0)) {
            isFull = false;
        }
        if (isFull) {
            console.log('field is full')
            this.gameEnd();
            return of(true);
        }
        return of(false);
    }

    private gameEnd(): void {
        this.gameStatus = Status.STOP;
    }

    checkGameEndWinner(): Observable<boolean> {
        let isWinner = false;
        const checkArray = (this.currentTurn === 1) ? this.winSituationsOne : this.winSituationsTwo;
        const currentarray = [];

        this.gameField.forEach((subfield, index) => {
            if (subfield !== this.currentTurn) {
                currentarray[index] = 0;
            }
            currentarray[index] = subfield;
        });

        checkArray.forEach((checkField, checkIndex) => {
            if (this.arrayEquals(checkField, currentarray)) {
                isWinner = true;
            }
        });
        console.log(currentarray);

        if (isWinner) {
            this.gameEnd();
            return of(true);
        }
        return of(false);
    }
}
