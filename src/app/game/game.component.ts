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
        {
            if (this.game.gameStatus === 1) {
                const position = subfiled.currentTarget.getAttribute('position');
                console.log(position);
                this.game.setField(position, this.game.currentTurn);
            };
        }
    }
}
