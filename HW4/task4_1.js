function getPasswordChecker(password) {
    return function checkPassword(pass) {
        return (pass === password);
    };
}

let myPass = getPasswordChecker("123654");
// console.log( "Введенный пароль: " + myPass("555555"));
// console.log( "Введенный пароль: " + myPass("123654"));
console.log(myPass(process.argv[2]));