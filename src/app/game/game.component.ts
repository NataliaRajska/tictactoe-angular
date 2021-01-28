import {Component, OnInit} from '@angular/core';
import {Gamelogic} from "../gamelogic";

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    providers: [Gamelogic]
})
export class GameComponent implements OnInit {

    constructor(public game: Gamelogic) {
    }

    ngOnInit(): void {
    }

    startGame(): void {
        this.game.gameStart();
        const currentPlayer = 'Current turn: PLayer: ' + this.game.currentTurn;
        const information = document.querySelector('.current-status');
        information.innerHTML = currentPlayer;
    }

    async clickSubfield(subfiled: any): Promise<void> {
        if (this.game.gameStatus === 1) {
            const position = subfiled.currentTarget.getAttribute('position');
            const information = document.querySelector('.current-status');
            console.log(position);

            this.game.setField(position, this.game.currentTurn);
            const color = this.game.getPlayerColorCLass();
            subfiled.currentTarget.classList.add(color);

            await this.game.checkGameEndWinner().then((end: boolean) => {
                if (this.game.gameStatus === 0 && end) {
                    const information = document.querySelector('.current-status');
                    information.innerHTML = 'The winner is Player ' + this.game.currentTurn;
                }
            });


            await this.game.checkGameEndFull().then((end: boolean) => {
                if (this.game.gameStatus === 0 && end) {
                    information.innerHTML = 'No winner, draw';
                }
            });


            this.game.changePlayer();

            if (this.game.gameStatus === 1) {
                const currentPlayer = 'Current turn: PLayer: ' + this.game.currentTurn;
                information.innerHTML = currentPlayer;
            }
        }
    }
}
