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

    clickSubfield(subfiled: any){
        if (this.game.gameStatus === 1) {
            const position = subfiled.currentTarget.getAttribute('position');
            const information = document.querySelector('.current-status');
            console.log(position);

            this.game.setField(position, this.game.currentTurn);
            const color = this.game.getPlayerColorCLass();
            subfiled.currentTarget.classList.add(color);

            this.game.checkGameEndWinner().subscribe((end: boolean) => {
                if (this.game.gameStatus === 0 && end) {
                    information.innerHTML = 'The winner is Player ' + this.game.currentTurn;
                }
            });

            this.game.checkGameEndFull().subscribe((end: boolean) => {
                if (this.game.gameStatus === 0 && end) {
                    information.innerHTML = 'Draw, congratulation both';
                }
            });

            this.game.changePlayer();

            if (this.game.gameStatus === 1) {
                information.innerHTML = 'Current turn: PLayer: ' + this.game.currentTurn;
            }
        }
    }
}
