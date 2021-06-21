import Player from "./Player.js";

class Human extends Player {
    pickACard(pick) {
        if (this.cardsLeft > 0) {
        for (let i = 0; i < this._cards.length; i++) {
                if (pick == this._cards[i]) {
                    this.cardsLeft -= 1;
                    this._cards.splice(i, 1);
                    return;
                }
            }
        }
    }
    pickIsCorrect(pick) {
        for (let i = 0; i < this._cards.length; i++) {
            if (pick == this._cards[i]) return true;
        }
        return false;
    }
}

export default Human;