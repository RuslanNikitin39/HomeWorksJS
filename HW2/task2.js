const goods = [
    {
        id: 1, 
        name: 'Перчатки', 
        description: 'Перечатки, нат. кожа, а ассортименте', 
        sizes: [10, 11, 12],   
        price:  950, 
        available: true,    
    },
    {
        id: 2, 
        name: 'Рубашка', 
        description: 'Рубашка, длинный рукав, хлопок', 
        sizes: ['S', 'M', 'L', 'XL'],   
        price:  1200, 
        available: true,    
    },
    {
        id: 3, 
        name: 'Брюки', 
        description: 'Брюки классические, шерсть', 
        sizes: [44, 46, 48],   
        price:  2300, 
        available: false,    
    },
    {
        id: 4, 
        name: 'Туфли муж.', 
        description: 'Туфли муж. верх - нат. кожа, подклад - нат.кожа', 
        sizes: [40, 41, 42, 43, 44],   
        price:  2900, 
        available: true,    
    },
    {
        id: 5, 
        name: 'Футболка', 
        description: 'Футболка в ассортименте с принтом', 
        sizes: ['S', 'M', 'L', 'XL'],   
        price:  500, 
        available: true,    
    },
]

let basket = [
    {
        goodId: 2,
        amount: 2,
    },
    {
        goodId: 4,
        amount: 1,
    },
    {
        goodId: 1,
        amount: 2,
    }
];

function addGoodsBasket(id){
    let good = goods.find(item => item.id === id);
    if (good !== undefined) {
        if (good.available) {
            basket.push(
                {
                    goodId: id,
                    amount: 1,
                }
            );
            return ('Товар ' + good.description + ' добавлен в корзину.');
        } else {
            return ('Товара ' + good.description + ' нет в наличии.');
        }  
    } else {
        return 'Товар не найден.'
    }   
}


function deleteGoodsBasket(id){
    good = goods.find(item => item.id === id);
    index = basket.findIndex(item => item.goodId === id);
    if (index !== -1) {
        basket.splice(index, 1); 
    }
    return 'Удален товар ' + good.description;
}


function clearBasket(){
    basket = [];
}

function getResultCost() {
    resultPrise = 0;
    resultAmount = 0;
   
    for (let i=0; i<basket.length; i++) {
        let good = goods.find(item => item.id === basket[i].goodId)
        if (good !== undefined) {
            resultPrise = resultPrise + (good.price * basket[i].amount);
            resultAmount = resultAmount + basket[i].amount;
        }
    }
         
    const totals = {
        totalAmount: resultAmount,
        totalSumm: resultPrise, 
    };

    return totals;
    } 


function showBasket() {
    console.log('------------------------------------------------------')
    console.log('В вашей корзине:')
    for (let i=0; i<basket.length; i++) {
        let good = goods.find(item => item.id === basket[i].goodId)
        if (good !== undefined) {
            console.log(good.id + ': ' + good.name + ' ' + basket[i].amount + ' ед.изм, цена: ' + good.price + ' у.е.')
        }
        
    } 

    resultCost = getResultCost();
    
    console.log('Всего товаров: ' + resultCost.totalAmount);
    console.log('Сумма покупок: ' + resultCost.totalSumm);

    console.log('------------------------------------------------------')
}

//Старт, сначала покажем корзину
showBasket();

//Добавим товар брюки (их нет в наличии)
console.log(addGoodsBasket(3));
showBasket();

//Добавим товар, которого нет в списке
console.log(addGoodsBasket(10));
showBasket();

//Добавим товар футболка 
console.log(addGoodsBasket(5));
showBasket();

//удалим один товар (перчатки)
console.log(deleteGoodsBasket(1));
showBasket();

//Очистим корзину
clearBasket();
showBasket();