class Shopping {
    handleClear(e) {
        ROOT_SHOPPING.innerHTML = "";
        ROOT_SHOPPING.classList.remove("active")
    }
    async render() {
        try {
            const productsStore = localStorageUtil.getProducts();
                let response = await fetch("https://shop-77-default-rtdb.firebaseio.com/shop.json")
                if(response.ok) {
                    let data = await response.json();
                    let list = "";
                    let sum = 0;
                    let numberFormat = new Intl.NumberFormat('ru-RU');
                    data.forEach(({id,title,price}) => {
                        if(productsStore.indexOf(id) !== -1) {
                            sum+=parseInt(price)
                             list += `
                                <li class="shopping-item">
                                    <h3 class="shopping-item__title"><img src="components/Shopping/img/smartphone.svg">${title}</h3>
                                    <span class="shopping-item__price">${price} ₽</span>
                                </li>
                             `; 
                        }
                    });
                   const html = `
                            <div class="shopping-container">
                                <span class="shopping-close"><img src="components/Shopping/img/close.svg" data-close="close"></span>
                                <h3 class="shopping-title">Корзина с товарами</h3>
                                <ul class="shopping-list">
                                    ${list}
                                </ul>
                                <div class="shopping-sum"><img src="components/Shopping/img/fire.svg"> <span class="shopping-sum__text">Сумма: ${numberFormat.format(sum)}   ₽</span></div>
                                <div class="shopping-btn__wrap">
                                    <button class="shopping-btn">Оформить заказ</button>
                                </div>
                            </div>
                   `
                   ROOT_SHOPPING.classList.add("active")
                   ROOT_SHOPPING.innerHTML = html;
                }
           }catch(e) {
                console.log(e)
           }

    }
}

const shoppingPage = new Shopping();



ROOT_SHOPPING.addEventListener("click",(e) => {
    if(e.target.dataset.close === "close") {
        shoppingPage.handleClear()
    }
})