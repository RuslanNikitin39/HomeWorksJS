function getSimpleNumbers(n) {
    // n - количество чисел в выводимом массиве
    simplArr = [];
    i = 0;
    while (simplArr.length < n){
        d = 2;
        while (i % d !== 0) {
            if (i < 2) {
                break;
            }
            d++;
        }
        if (i === d) {
            simplArr.push(i);    
        }    
        i++;
       
    }
    return simplArr
}

console.log(getSimpleNumbers(process.argv[2]));