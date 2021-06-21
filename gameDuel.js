function Player() {
    this.cards = [];
    this.penaltyPts = 0;
}

let p1 = new Player();
let p2 = new Player();
let cardsPerPlayer = 12;
let yourTurn = true;
let botPick, penaltyPoints;

let setCards = (firstPl, secondPl, cardsPerPlayer) => {
    for (let i = 0; i < cardsPerPlayer; i++) {
        firstPl.push(Math.floor(Math.random()*12))
        secondPl.push(Math.floor(Math.random()*12))
    }
}
let showCards = (hand) => {
    let str = "";
    for (let i = 0; i < hand.length; i++) {
        str += `${hand[i]} `;
    }
    console.log(str);
}
let pickACard = (pick, hand) => {
    for (let i = 0; i < hand.length; i++) {
        if (pick == hand[i]) {
            hand.splice(i, 1);
            return;
        }
    }
}
let pickACardAI = (hand, playersTurn) => {
    if (!playersTurn) {
        let maxIndex = 0;
        let max = hand[maxIndex];
        for (let i = 1; i < hand.length; i++) {
            if (max < hand[i]) {
                max = hand[i];
                maxIndex = i;
            }
        }
        hand.splice(maxIndex, 1);
        return max;
    } else {
        let minIndex = 0;
        let min = hand[minIndex];
        for (let i = 1; i < hand.length; i++) {
            if (min > hand[i]) {
                min = hand[i];
                minIndex = i;
            }
        }
        hand.splice(minIndex, 1);
        return min;
    }
}

const { listenerCount } = require("events");
const readline = require("readline");
const r1 = readline.createInterface({input: process.stdin, output: process.stdout});

setCards(p1.cards, p2.cards, cardsPerPlayer);

console.log("Ваши карты: ");
showCards(p1.cards);
r1.on('line', (input) => {
    
    //Игрок выбирает карту
    pickACard(input.trim(), p1.cards);
    showCards(p1.cards);

    //Бот выбирает карту
    // showCards(p2.cards);
    botPick = pickACardAI(p2.cards, yourTurn);
    // showCards(p2.cards);

    if (yourTurn) {
        console.log("Ваша атака: " + input.trim());
        console.log("Защита противника: " + botPick);
        penaltyPoints = parseInt(input.trim()) - botPick;
        if (penaltyPoints < 0) penaltyPoints = 0;
        p2.penaltyPts += penaltyPoints;
    } else {
        console.log("Ваша защита: " + input.trim());
        console.log("Атака противника: " + botPick);
        penaltyPoints = botPick - parseInt(input.trim());
        if (penaltyPoints < 0) penaltyPoints = 0;
        p1.penaltyPts += penaltyPoints;
    }
    console.log("Штрафных очков начилено: " + penaltyPoints);

    yourTurn = !yourTurn;

    if (p2.cards.length == 0) {
        console.log("У игроков кончились карты");
        console.log("Количество штрафных очков: ");
        console.log("Вы: " + p1.penaltyPts);
        console.log("ИИ: " + p2.penaltyPts);

        if (p1.penaltyPts < p2.penaltyPts) console.log("Вы победили!");
        else if (p1.penaltyPts > p2.penaltyPts) console.log("Вы проиграли");
        else console.log("Ничья");

        r1.close();
    }

}).on('close', function() {
    console.log("Конец.");;
    process.exit(0);
})