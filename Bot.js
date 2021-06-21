import Player from "./Player.js";

class Bot extends Player {
        pickACard(isAttacking) {
            if (this.cardsLeft > 0) {
                this.cardsLeft -= 1;
                if (isAttacking) {
                    let maxIndex = 0;
                    let max = this._cards[maxIndex];
                    for (let i = 1; i < this._cards.length; i++) {
                        if (max < this._cards[i]) {
                            max = this._cards[i];
                            maxIndex = i;
                        }
                    }
                    this._cards.splice(maxIndex, 1);
                    return max;
                } else {
                    let minIndex = 0;
                    let min = this._cards[minIndex];
                    for (let i = 1; i < this._cards.length; i++) {
                        if (min > this._cards[i]) {
                            min = this._cards[i];
                            minIndex = i;
                        }
                    }
                    this._cards.splice(minIndex, 1);
                    return min;
                }
            }
        }
}

export default Bot;