import Player from "./Player.js";

class Bot extends Player {
    constructor() {
        super();
        this._opponentCards = this._cards.slice();
        this.averageCardValue = this.countAverage(this._cards);
        this.averageOpponentCardValue = this.averageCardValue;
    }
    getOpponentCards() {
        return this._opponentCards;
    }
    pickACard(isAttacking) {
            if (this.cardsLeft > 0) {
                this.cardsLeft -= 1;
                let pickIndex = 0;
                let pick = this._cards[pickIndex];
                if (isAttacking) {
                    // если бот атакует
                    if (this.averageCardValue <= this.averageOpponentCardValue) {
                        // если среднее значение карты бота меньше или равно среднего значения карты игрока
                        // походить наименьшей картой (ниже описан поиск)
                        for (let i = 0; i < this._cards.length; i++) {
                            if (pick > this._cards[i]) {
                                pickIndex = i;
                                pick = this._cards[pickIndex];
                            }
                        }
                    } else {
                        // иначе
                        // походить наибольшей картой (ниже описан поиск)
                        for (let i = 0; i < this._cards.length; i++) {
                            if (pick < this._cards[i]) {
                                pickIndex = i;
                                pick = this._cards[pickIndex];
                            }
                        }
                    }
                } else {
                    // если бот защищается
                    // походить картой, наиболее близкой к среднему значению карт игрока (ниже поиск)
                    for (let i = 1; i < this._cards.length; i++) {
                        if (Math.abs(this.averageOpponentCardValue - this._cards[i]) < Math.abs(this.averageOpponentCardValue - pick)) {
                            pickIndex = i;
                            pick = this._cards[pickIndex];
                        }
                    }
                }
                this._cards.splice(pickIndex, 1); // удаление нвыбранной карты из набора бота
                this.averageCardValue = this.countAverage(this.getCards()); // пересчёт среднего значения карт на руках бота
                return pick;
            }
    }   
    trackOpponentCards(opponentPick) {// отслеживаем изменение средного значения карт у игрока (противнака бота)
        for (let i = 0; i < this._opponentCards.length; i++) {
            // Находим карту, которой походил противник
            if (opponentPick == this._opponentCards[i]) {
                this._opponentCards.splice(i, 1); // Исключаем её из массива карт противника
                this.averageOpponentCardValue = this.countAverage(this.getOpponentCards()); // обновляем среднее значение карт противника
                break;
            }
        }
    }
    countAverage(cards) {// подсчёт среднего значения в массиве
        let average = 0;
        for (let i = 0; i < cards.length; i++) {
            average += cards[i];
        }
        average /= cards.length;
        return average;
    }
}

export default Bot;