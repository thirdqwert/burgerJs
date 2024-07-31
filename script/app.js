let products = [
    { id: 1, name: 'Crazy', price: 31000, amount: 0, img: 'images/products/burger-1.png' },
    { id: 2, name: 'Light', price: 26000, amount: 0, img: 'images/products/burger-2.png' },
    { id: 3, name: 'CheeseBurger', price: 29000, amount: 0, img: 'images/products/burger-3.png' },
    { id: 4, name: 'dBurger', price: 24000, amount: 0, img: 'images/products/burger-4.png' },
    { id: 5, name: 'lorem', price: 12000, amount: 0, img: 'https://www.eso-cur.com/wp-content/uploads/2015/04/McD-QPC-photo.jpg' }
]
let openListBtn = document.querySelector('.wrapper__navbar-btn')
let listWind = document.querySelector('.wrapper__navbar-basket')
let closeWind = document.querySelector('.wrapper__navbar-close')
let countItem = document.querySelector('.warapper__navbar-count')
let korzina = []
let mainWrap = document.querySelector('.wrapper__list')
let totalPrice = document.querySelector('.wrapper__navbar-totalprice')
let checkList = document.querySelector('.wrapper__navbar-checklist')
let titleCh = document.querySelector('.titleB')
let bodyColor = document.querySelector('body')
let headerColor = document.querySelector('.wrapper__nav')
function outBurgers() {
    products.forEach((item, i) => {
        let { id, name, price, amount, img } = item
        mainWrap.innerHTML += `
        <div class="wrapper__list-card" id="${id}">
                <p class="wrapper__list-count"></p>
                <img class="wrapper__list-image" src="${img}" alt="">
                <h3 class="wrapper__list-title">${name}</h3>
                <div class="wrapper__list-sub">
                    <p class="wrapper__list-text">${price}</p>
                    <button class="wrapper__list-btn"><img src="images/sell-icon.svg" alt=""></button>
                </div>
            </div>
        `
    })
}

openListBtn.addEventListener('click', () => {
    listWind.classList.add('active')

})
closeWind.addEventListener('click', () => {
    listWind.classList.remove('active')
})
outBurgers()
let cardsBtn = document.querySelectorAll('.wrapper__list-btn')
cardsBtn.forEach((item, i) => {
    item.addEventListener('click', () => {
        addAmount(item)
        countItem.classList.add('active')

    })
});

function addAmount(el) {
    let id = el.closest('.wrapper__list-card').getAttribute('id')
    let currentBurger = products.find((item) => item.id == id)

    if (currentBurger.amount < 10) {
        currentBurger.amount++

    }
    else {
        alert('Вы заказали слишком много бургеров');
    }
    addToKorzina(currentBurger)
}
function addToKorzina(el) {
    if (el.amount > 0) {
        if (!korzina.includes(el)) {
            korzina.push(el)

        }
    }
    sumAndAmount()

}
function sumAndAmount() {
    totalPrice.innerHTML = getTotalSum()
    let allAmount = getTotalAmount()
    if (allAmount > 0) {
        countItem.classList.add('active')
        countItem.innerHTML = allAmount
    } else {
        countItem.classList.remove('active')
    }
    outFromKorzina()

}

function getTotalAmount() {
    let sum = 0
    products.forEach((item, i) => {
        sum = item.amount + sum
        countItem.innerHTML = ''
    })
    return sum
}
function getTotalSum() {
    let sum = 0
    korzina.forEach((item, i) => {
        sum = sum + item.price * item.amount
    })
    return sum + 'sum'
}

function outFromKorzina() {

    checkList.innerHTML = ''
    korzina.forEach((el, i) => {
        checkList.innerHTML += `
        <div class="navbar__item" data-id=${el.id}>
            <div class="navbar__item-left">
                <img src="${el.img}" alt="">
                <div class="navbar__item-left-info">
                    <p class="navbar__item-left-name">${el.name}</p>
                    <p class="navbar__item-left-price">${el.price} сум</p>
                </div>
            </div>
            <div class="navbar__item-right">
                <button data-symbol="-" class="navbar__item-btn">-</button>
                <output class="navbar__item-count">${el.amount}</output>
                <button data-symbol="+" class="navbar__item-btn">+</button>
            </div>
        </div>
        `
    })

}
window.addEventListener(('click'), (event) => {
    if (event.target.classList.contains('navbar__item-btn')) {
        let id = event.target.closest('.navbar__item').getAttribute('data-id')
        let tBurger = products.find((item) => item.id == id)
        let dataValue = event.target.getAttribute('data-symbol')
        if (dataValue == '-') {
            tBurger.amount--

        }
        else if (dataValue == '+' && tBurger.amount < 10) {
            tBurger.amount++
        }
        korzina = korzina.filter((burger) => burger.amount > 0)
        sumAndAmount()
    }
})
    let ip = 0
function changeTitle() {
     if (ip < 100) {
        titleCh.innerHTML = ip
        titleCh.style.color = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`
        ip++
        if (ip == 99) {
            titleCh.style.transition = `.5s`
            titleCh.style.fontSize = `${ip}px`
            
        }
        else if (ip == 100) {
            titleCh.innerHTML = ip+' LVL'
            bodyColor.style.background = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`
            headerColor.style.background = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`
        }
    }
    setTimeout(() => {
        if (ip < 100) {
            changeTitle()
        }
    }, 50);
}
changeTitle()
function randomColor() {
    return  Math.floor(Math.random() * 256)
}
