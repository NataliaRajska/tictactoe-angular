import {Status} from './status.enum';

export class Gamelogic {

    gameField: Array<number> = [];
    gameStatus: Status;
    currentTurn: number;
    winSituationsOne: Array<Array<number>> = [
        [1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1]
    ]

    winSituationsTwo: Array<Array<number>> = [
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

    arrayEquals(a: Array<any>, b: Array<any>): boolean {
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length &&
            a.every((value, index) => value === b[index]);
    }

    async checkGameEndFull(): Promise<boolean> {
        let isFull = true;
        if (this.gameField.includes(0)) {
            isFull = false;
        }
        if (isFull) {
            console.log('field is full')
            this.gameEnd();
            return true;
        }
        return false;
    }

    private gameEnd(): void {
        this.gameStatus = Status.STOP;
    }

    async checkGameEndWinner(): Promise<boolean> {
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
            return true;
        }
        return false;
    }
}
