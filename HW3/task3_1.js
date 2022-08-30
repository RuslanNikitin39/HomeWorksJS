class Good{
    constructor(id, name, description, sizes, price, available){
        this.id = id;
        this.name  =  name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    
    setAvailable(value) {
        this.available = value;
        return `Товару ${this.name} установлено свойство available в значение ${value}.`
    }
}

class GoodsList{
    #goods = [];
    constructor(goods, filter, sortPrice, sortDir){
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    //вывод списка с отбором и сортировкой
    get list(){
        //выберем товар в наличии и по отбору
        let tempList = [];
        for (let i=0; i < this.#goods.length; i++) {
            if (this.#goods[i].available === true && this.filter.test(this.#goods[i].name) === true) {
                tempList.push(this.#goods[i]);
            }
        }
        
        //получим направление сортировки, если сортировка предусмотрена
        let sortOrder = function(a, b) {
            if (this.sortPrice === true) {
                if (this.sortDir === true) {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            }
        }

        return tempList.sort(sortOrder.bind(GoodsList))
    }

    //Метод "showList", сможем смотреть все товары гибко
    showList(filter, sortPrice, sortDir, allGoods = false){
        let tempList = [];
        for (let i=0; i < this.#goods.length; i++) {
            if(allGoods === false && filter !=='') {
                if (this.#goods[i].available === true && filter.test(this.#goods[i].name) === true) {
                    tempList.push(this.#goods[i]);
                }
            } else if (allGoods === true && filter !=='') {
                if (filter.test(this.#goods[i].name) === true) {
                    tempList.push(this.#goods[i]);
                }
            } else if (allGoods === false && filter ==='') {
                if (this.#goods[i].available === true) {
                    tempList.push(this.#goods[i]);
                }
            } else {
                tempList.push(this.#goods[i]);
            }
        }
    
        let sortOrder = function(a, b) {
            if (sortPrice === true) {
                if (sortDir === true) {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            }
        }

        return tempList.sort(sortOrder.bind(GoodsList))
    }

    //метод "Добавить"
    add(newGood) {
        this.#goods.push(newGood);
        return `Добавлен новый товар: ${newGood.name}`
    }

    //метод "Удалить"
    remove(id) {
        let goodDeleted = false;
        this.#goods.forEach((good, index) => {
            if (good.id === id) {
                this.#goods.splice(index, 1);
                goodDeleted = true;
            } 
        })
        if (goodDeleted === true){
            return `Товар с номером ${id} удален`;
        } 

        return `Товар с номером ${id} не найден`;
    }
}


class BasketGood extends Good {
    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available);
        this.amount = amount;
    }
}


class Basket {
    constructor(){
        this.goods = [];
    }

    //геттеры
    //количество товаров в корзине
    get totalAmount() {
        let result = this.goods.reduce(function(totalAmount, good){
            return totalAmount + good.amount;
        }, 0);

        return result
    }

    //стоимость товаров в корзине
    get totalSum(){
        let result = this.goods.reduce(function(totalSum, good){
            return totalSum + good.amount * good.price;
        }, 0);

        return result
    }

    //методы
    add(good, amount){
        let goodInBasket = this.goods.find(item => item.id === good.id);
        if (goodInBasket !== undefined) {
            goodInBasket.amount += amount;
        } else {
            this.goods.push(good);
        }
    }

    remove(good, amount = 1){
        let index = this.goods.findIndex(item => item.id === good.id);
        if (index !== -1) {
            let goodInBasket = this.goods[index];
            if (goodInBasket.amount - amount > 0) {
                goodInBasket.amount -= amount;
            } else {
                this.goods.splice(index, 1);
            }
        }
    }

    clear(){
        this.goods = [];
    }

    removeUnavailable(){
        this.goods = this.goods.filter(good => good.available === true);
        return this.goods
    }
}


///////////////////////////////////////////////////////
//Добавим товар 

const good1 = new Good(
    1,
    'Перчатки', 
    'Перечатки, нат. кожа, а ассортименте', 
    [10, 11, 12],   
    950, 
    true,    
)

const good2 = new Good(
    2, 
    'Рубашка', 
    'Рубашка, длинный рукав, хлопок', 
    ['S', 'M', 'L', 'XL'],   
    1200, 
    true,    
)

const good3 = new Good(
    3, 
    'Брюки', 
    'Брюки классические, шерсть', 
    [44, 46, 48],   
    2300, 
    false,    
)

const good4 = new Good(
    4, 
    'Туфли муж.', 
    'Туфли муж. верх - нат. кожа, подклад - нат.кожа', 
    [40, 41, 42, 43, 44],   
    2900, 
    true,    
)

const good5 = new Good(
    5, 
    'Футболка', 
    'Футболка в ассортименте с принтом', 
    ['S', 'M', 'L', 'XL'],   
    500, 
    true,    
)


const newGoodsList = [];
newGoodsList.push(good1);
newGoodsList.push(good2);
newGoodsList.push(good3);
newGoodsList.push(good4);
newGoodsList.push(good5);


// //строка фильтра
strFilter = /(Рубашка|Футболка)/ig;
//создадим GoodList
const newCatalog = new GoodsList(newGoodsList, strFilter, true, true);

//смотрим через геттер
console.log('---------------------------------------------------------------');
console.log(newCatalog.list); // не понятна архитектура справочника, если хочу найти только брюки, что делать? или все хочу посмотреть и без сортировки?
console.log('---------------------------------------------------------------');

//поэтому добавлю метод, будем смотреть справочник как захотим.
//весь товар
strFilter = '';
console.log(newCatalog.showList(strFilter, true, true, true));//фильтр, вкл/выкл сортировка, направление сортировки, показывать все товары 
console.log('---------------------------------------------------------------');

//товар в наличии
strFilter = '';
console.log(newCatalog.showList(strFilter, true, true)); 
console.log('---------------------------------------------------------------');

//брюки
strFilter = /Брюки/ig;
console.log(newCatalog.showList(strFilter, true, true, true));
console.log('---------------------------------------------------------------');

//////////////////////
//методы удалить и добавить
console.log(newCatalog.remove(3));

strFilter = '';
console.log(newCatalog.showList(strFilter, true, true, true));
console.log('---------------------------------------------------------------');

//удаление несуществующего товара
console.log(newCatalog.remove(10));
console.log('---------------------------------------------------------------');

//добавление нового товара
const good6 = new Good (
    4,
    "Пиджак черный",
    "хлопок 100 %",
    ["M", "L", "XL", "XXL"],
    3500,
    false,
    );

console.log(newCatalog.add(good6));
strFilter = /Пиджак/ig;
console.log(newCatalog.showList(strFilter, true, true, true));
console.log('---------------------------------------------------------------');

//установка доступности товара
console.log(good6.setAvailable(true));

strFilter = /Пиджак/ig;
console.log(newCatalog.showList(strFilter, true, true, true));
console.log('---------------------------------------------------------------');

//Работа с корзиной
const newBasketGood1 = new BasketGood(good1, 2);
const newBasketGood2 = new BasketGood(good2, 3);
const newBasketGood3 = new BasketGood(good3, 1);
const newBasketGood4 = new BasketGood(good4, 2);
const newBasketGood5 = new BasketGood(good5, 5);

const newBasket = new Basket();

newBasket.add(newBasketGood1);
newBasket.add(newBasketGood2);
newBasket.add(newBasketGood3);
newBasket.add(newBasketGood4);
newBasket.add(newBasketGood5);

console.log(newBasket.goods);
console.log('---------------------------------------------------------------');

//вывод итогов по корзине
console.log("Всего товаров: " + newBasket.totalAmount);
console.log("на сумму: " + newBasket.totalSum);
console.log('---------------------------------------------------------------');

//удалим товар 2
newBasket.remove(newBasketGood2, 1);
console.log(newBasket.goods);
console.log('---------------------------------------------------------------');

//удалим товар 4 полностью
newBasket.remove(newBasketGood4, 2);
console.log(newBasket.goods);
console.log('---------------------------------------------------------------');

//удалим из корзины недоступные товары
newBasket.removeUnavailable();
console.log(newBasket.goods);
console.log('---------------------------------------------------------------');

//очистить корзину
newBasket.clear();
console.log(newBasket.goods);
