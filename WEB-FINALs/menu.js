let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'OPTIMUM NUTRITION GOLD STANDARD 100%',
        image: '1.PNG',
        price: 3850.00
    },
    {
        id: 2,
        name: 'VS NUTRITION PROMATRIX 2 LBS WHEY',
        image: '2.PNG',
        price: 850.00
    },
    {
        id: 3,
        name: 'OPTIMUM NUTRITION SUPERIOR AMINO 2222',
        image: '3.PNG',
        price: 1050.00
    },
    {
        id: 4,
        name: 'OPTIMUM NUTRITION SERIOUS MASS GAINER 6',
        image: '4.PNG',
        price: 2400.00
    },
    {
        id: 5,
        name: 'RULE 1 R1 CASEIN 4 LBS 100%',
        image: '5.PNG',
        price: 2650.00
    },
    {
        id: 6,
        name: 'SCIVATION XTEND BCAAS 90 SERVINGS',
        image: '6.PNG',
        price: 2600.00
    },
    {
        id: 7,
        name: 'CELLUCOR C4 PRE WORKOUT 60 SERVINGS',
        image: '7.PNG',
        price: 2050.00
    },
    {
        id: 8,
        name: 'STACKER2 100% WHEY PROTEIN SOURCE 5 LBS',
        image: '8.PNG',
        price: 1850.00
    },
    {
        id: 9,
        name: 'RULE 1 R1 PROTEIN WHEY ISOLATE 5 LBS',
        image: '9.PNG',
        price: 4000.00
    },
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}