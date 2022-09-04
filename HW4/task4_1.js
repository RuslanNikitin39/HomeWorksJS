function getPasswordChecker(password) {
    return function checkPassword(pass) {
        return (pass === password);
    };
}

let myPass = getPasswordChecker("myPassword");
console.log( "Введенный пароль: " + myPass("yourPassword"));
console.log( "Введенный пароль: " + myPass("myPassword"));
