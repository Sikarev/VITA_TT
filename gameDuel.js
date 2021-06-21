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
        firstPl.push(i);
        secondPl.push(i);
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
let pickIsCorrect = (pick, hand) => {
    for (let i = 0; i < hand.length; i++) {
        if (pick == hand[i]) return true;
    }
    return false;
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
let setPenalty = (attackPts, defendPts) => {
    let penaltyPoints = attackPts - defendPts;
    if (penaltyPoints < 0) penaltyPoints = 0;
    return penaltyPoints;
}

const { listenerCount } = require("events");
const readline = require("readline");
const r1 = readline.createInterface({input: process.stdin, output: process.stdout});

setCards(p1.cards, p2.cards, cardsPerPlayer);

console.log("Ваши карты: ");
showCards(p1.cards);
r1.on('line', (input) => {
    if (pickIsCorrect(input.trim(), p1.cards)) {
    
        //Игрок выбирает карту
        pickACard(input.trim(), p1.cards);
        showCards(p1.cards);

        //Бот выбирает карту
        botPick = pickACardAI(p2.cards, yourTurn);

        if (yourTurn) {
            console.log("Ваша атака: " + input.trim());
            console.log("Защита противника: " + botPick);
            penaltyPoints = setPenalty(parseInt(input.trim()), botPick);
            p2.penaltyPts += penaltyPoints;
        } else {
            console.log("Ваша защита: " + input.trim());
            console.log("Атака противника: " + botPick);
            penaltyPoints = setPenalty(botPick, parseInt(input.trim()));
            p1.penaltyPts += penaltyPoints;
        }
        console.log("Штрафных очков начислено: " + penaltyPoints);

        yourTurn = !yourTurn;

        if (p1.cards.length == 0) {
            console.log("У игроков кончились карты");
            console.log("Количество штрафных очков: ");
            console.log("Вы: " + p1.penaltyPts);
            console.log("ИИ: " + p2.penaltyPts);

            if (p1.penaltyPts < p2.penaltyPts) console.log("Вы победили!");
            else if (p1.penaltyPts > p2.penaltyPts) console.log("Вы проиграли");
            else console.log("Ничья");

            r1.close();
        }
    } else {
        console.log("Такой карты у вас нет. Попробуйте ещё раз");
        showCards(p1.cards);
    }

}).on('close', function() {
    console.log("Конец.");;
    process.exit(0);
})

// let pickRandomCard = (hand) => {
//     let pickIndex = Math.floor(Math.random()*hand.length);
//     let result = hand[pickIndex];
//     hand.splice(pickIndex, 1);
//     return result;
// }
// let rndPick;

// console.log("Ваши карты: ");
// showCards(p1.cards);
// r1.on('line', (input) => {
    
//         //Игрок выбирает карту
//         rndPick = pickRandomCard(p1.cards);
//         showCards(p1.cards);

//         //Бот выбирает карту
//         // showCards(p2.cards);
//         botPick = pickACardAI(p2.cards, yourTurn);
//         // showCards(p2.cards);

//         if (yourTurn) {
//             console.log("Ваша атака: " + rndPick);
//             console.log("Защита противника: " + botPick);
//             penaltyPoints = rndPick - botPick;
//             if (penaltyPoints < 0) penaltyPoints = 0;
//             p2.penaltyPts += penaltyPoints;
//         } else {
//             console.log("Ваша защита: " + rndPick);
//             console.log("Атака противника: " + botPick);
//             penaltyPoints = botPick - rndPick;
//             if (penaltyPoints < 0) penaltyPoints = 0;
//             p1.penaltyPts += penaltyPoints;
//         }
//         console.log("Штрафных очков начилено: " + penaltyPoints);

//         yourTurn = !yourTurn;

//         if (p1.cards.length == 0) {
//             console.log("У игроков кончились карты");
//             console.log("Количество штрафных очков: ");
//             console.log("Вы: " + p1.penaltyPts);
//             console.log("ИИ: " + p2.penaltyPts);

//             if (p1.penaltyPts < p2.penaltyPts) console.log("Вы победили!");
//             else if (p1.penaltyPts > p2.penaltyPts) console.log("Вы проиграли");
//             else console.log("Ничья");

//             r1.close();
//         }

// }).on('close', function() {
//     console.log("Конец.");;
//     process.exit(0);
// })