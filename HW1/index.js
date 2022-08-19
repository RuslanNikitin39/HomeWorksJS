while (true) {
    let num = Math.round(Math.random());
    console.log('Я загадал число:', num);

    let guessNum = prompt('Введите ваше число (0 или 1, q - выход):');
    console.log('Пользователь ввел:', +guessNum);

    if (guessNum === 'q') {
        alert('Игра окончена!');
        break; 
    }
    if (isNaN(guessNum)) {
        alert('Вы ввели не число!')
    } else if (+guessNum != 0 && +guessNum != 1){
        alert('Вы ввели не 0 и не 1!')
    } else if (+guessNum === num) {
        alert('Вы угадали!');
    } else {
        alert('Вы не угадали!');
    }
}