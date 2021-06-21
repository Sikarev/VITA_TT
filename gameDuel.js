import Human from "./Human.js";
import Bot from "./Bot.js"
import readline from "readline"

let human = new Human();
let bot = new Bot();
let humansTurn = true;
let botPick, penaltyPoints;

let calculatePenalty = (attackPts, defendPts) => {
    let penaltyPoints = attackPts - defendPts;
    if (penaltyPoints < 0) penaltyPoints = 0;
    return penaltyPoints;
}

const r1 = readline.createInterface({input: process.stdin, output: process.stdout});

console.log("Игра \"Дуель\"");
console.log("##############");
console.log("Ctrl + D - сдаться");
human.showCards();
console.log("Атакуйте!");

r1.on('line', (input) => {
    if (human.pickIsCorrect(input.trim())) {
        //Игрок выбирает карту
        human.pickACard(input.trim());

        //Бот выбирает карту
        botPick = bot.pickACard(!humansTurn);
        
        //Бот запоминает, какую карту выбрал игрок и одновляет информацию об оставшихся картах игрока
        //Отслеживание карт происходит уже после того, как игроки сделали свой выбор,
        //это значит, что бот не подглядывал за человеком и принимал решение независимо от его выбора на текущем ходу
        //таким образом, условия задачи соблюдены - бот играет честно
        bot.trackOpponentCards(parseInt(input.trim()));

        if (humansTurn) {
            console.log("Ваша атака: " + input.trim());
            console.log("Защита противника: " + botPick);
            penaltyPoints = calculatePenalty(parseInt(input.trim()), botPick); // подсчёт штрафных очков
            bot.setPenaltyPts(penaltyPoints); // начисление штрафных очков защищающемуся
            console.log("Штрафных очков начислено: " + penaltyPoints);
            console.log("Защищайтесь!");
            console.log("Ваши карты: ");
            human.showCards();
        } else {
            console.log("Ваша защита: " + input.trim());
            console.log("Атака противника: " + botPick);
            penaltyPoints = calculatePenalty(botPick, parseInt(input.trim())); // подсчёт штрафных очков
            human.setPenaltyPts(penaltyPoints); // начисление штрафных очков защищающемуся
            console.log("Штрафных очков начислено: " + penaltyPoints);
            console.log("Атакуйте!");
            console.log("Ваши карты: ");
            human.showCards();
        }

        humansTurn = !humansTurn; // смена хода

        if (human.cardsLeft == 0) {
            // если у человека кончились карты
            // равносильный вариант - если у обоих игроков кончились карты
            console.log("У игроков кончились карты");
            console.log("Количество штрафных очков: ");
            console.log("Вы: " + human.getPenaltyPts());
            console.log("ИИ: " + bot.getPenaltyPts());

            // определение победителя по количеству штрафных очков
            if (human.getPenaltyPts() < bot.getPenaltyPts()) console.log("Вы победили!");
            else if (human.getPenaltyPts() > bot.getPenaltyPts()) console.log("Вы проиграли");
            else console.log("Ничья");

            r1.close();
        }
    } else {
        console.log("Неверный ввод. Попробуйте ещё раз");
        human.showCards();
    }

}).on('close', function() {
    console.log("Конец.");;
    process.exit(0);
})