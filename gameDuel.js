import Human from "./Human.js";
import Bot from "./Bot.js"
import readline from "readline"

let p1 = new Human();
let p2 = new Bot();
let humansTurn = true;
let botPick, penaltyPoints;

let calculatePenalty = (attackPts, defendPts) => {
    let penaltyPoints = attackPts - defendPts;
    if (penaltyPoints < 0) penaltyPoints = 0;
    return penaltyPoints;
}

const r1 = readline.createInterface({input: process.stdin, output: process.stdout});

console.log("Ваши карты: ");
p1.showCards();
r1.on('line', (input) => {
    if (p1.pickIsCorrect(input.trim())) {
    
        //Игрок выбирает карту
        p1.pickACard(input.trim());
        p1.showCards();

        //Бот выбирает карту
        botPick = p2.pickACard(!humansTurn);

        if (humansTurn) {
            console.log("Ваша атака: " + input.trim());
            console.log("Защита противника: " + botPick);
            penaltyPoints = calculatePenalty(parseInt(input.trim()), botPick);
            p2.setPenaltyPts(penaltyPoints);
        } else {
            console.log("Ваша защита: " + input.trim());
            console.log("Атака противника: " + botPick);
            penaltyPoints = calculatePenalty(botPick, parseInt(input.trim()));
            p1.setPenaltyPts(penaltyPoints);
        }
        console.log("Штрафных очков начислено: " + penaltyPoints);

        humansTurn = !humansTurn;

        if (p1.cardsLeft == 0) {
            console.log("У игроков кончились карты");
            console.log("Количество штрафных очков: ");
            console.log("Вы: " + p1.getPenaltyPts());
            console.log("ИИ: " + p2.getPenaltyPts());

            if (p1.getPenaltyPts() < p2.getPenaltyPts()) console.log("Вы победили!");
            else if (p1.getPenaltyPts() > p2.getPenaltyPts()) console.log("Вы проиграли");
            else console.log("Ничья");

            r1.close();
        }
    } else {
        console.log("Такой карты у вас нет. Попробуйте ещё раз");
        p1.showCards();
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
//         botPick = pickACardAI(p2.cards, humansTurn);
//         // showCards(p2.cards);

//         if (humansTurn) {
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

//         humansTurn = !humansTurn;

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