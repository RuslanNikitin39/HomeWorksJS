while (true) {
    
    let n = Math.round(Math.random()*1000);
    console.log('Я загадал число:', n);

    let guessNum = prompt('Введите ваше число (от 0 до 999, q - выход):');
    console.log('Пользователь ввел:', +guessNum);

    if (guessNum === 'q') {
        alert('Игра окончена!');
        break; 
    }
    if (isNaN(guessNum)) {
        alert('Вы ввели не число!');
    } else if (+guessNum >= 1000){
        alert('Вы ввели число, больше 999!');
    } else if (+guessNum < 0){
        alert('Вы ввели число, меньше 0!');
    } else if (+guessNum === n) {
        alert('Вы угадали!');
    } else {
        if (+guessNum > n) {
            alert('Вы не угадали! Ваше число больше.');
        } else {
            alert('Вы не угадали! Ваше число меньше.');
        }
        
    }
}