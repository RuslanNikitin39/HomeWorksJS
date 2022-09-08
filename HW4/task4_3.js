const rl = require('node:readline/promises').createInterface(process.stdin, process.stdout);

let nomber = Math.round(Math.random()*100);

let attemp = 1;

async function runGame() {
    //console.log(nomber);
    attemp = 1;
    const cmd = await rl.question('Введите ваше число: '); 
    //rl.question('Введите ваше число: ', (cmd) => {
        if (cmd == 'quit') {
            console.log(`До свидания! Попыток угадать: ${attemp - 1}.`);
            rl.close();
            return;
        }
       
        if (isNaN(cmd)) {
            console.log(`Попытка ${attemp}: Вы ввели не число!`);  
        } else if (+cmd > 100){
            console.log(`Попытка ${attemp}: Вы ввели число, больше 100!`);   
        } else if (+cmd < 0){
            console.log(`Попытка ${attemp}: Вы ввели число, меньше 0!`);  
        } else if (+cmd === nomber) {
            console.log(`Попытка ${attemp}: Вы угадали!`);
            rl.close();
            return;
        } else if (+cmd > nomber) {
            console.log(`Попытка ${attemp}: Вы не угадали! Ваше число больше.`);
        } else if (+cmd < nomber) {
            console.log(`Попытка ${attemp}: Вы не угадали! Ваше число меньше.`);
        }
        
        attemp++;

        runGame();
   // })
}


console.log("Я загадал число от 0 до 100. Угадайте. Для завершения введите 'quit'.");

runGame();