class Player {
    constructor() {
        this._cards = new Array();
        this._penaltyPts = 0;
        this._maxCards = 12;
        this.cardsLeft = 12;
        this.setCards();
    }
    setCards() {
        for (let i = 0; i < this._maxCards; i++) {
            this._cards.push(i);
        }
    }
    showCards() {
        let str = "";
        for (let i = 0; i < this._cards.length; i++) {
            str += `${this._cards[i]} `;
        }
        console.log(str);
    }
    getPenaltyPts() {
        return this._penaltyPts;
    }
    setPenaltyPts(penaltyPts) {
        this._penaltyPts += penaltyPts;
    }
}

export default Player;