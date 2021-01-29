class Products {
    constructor() {
        this.classNameActive = "active";
        this.labelAdd = "Добавить в корзину";
        this.labelRemove = "Удалить из корзины";
    }
    onloadPage() {
        spinnerPage.render()
    }
    handleSetLocationStorage(el,id) {
       const {pushProducts,products} = localStorageUtil.putProducts(id)
        if(pushProducts) {
            el.classList.add(this.classNameActive)
            el.innerHTML = this.labelRemove;
        }else {
            el.classList.remove(this.classNameActive)
            el.innerHTML = this.labelAdd;
        }
        header.render(products.length)
    }
   async render() {
    ROOT_PRODUCTS.innerHTML = `
        <div class="spinner-block">
            <img src="components/Spinner/img/spinner.svg" >
        </div>
    `;
       try {
        const productsStore = localStorageUtil.getProducts();
        const response = await fetch("https://shop-77-default-rtdb.firebaseio.com/shop.json")
            if(response.ok) {
                const data = await response.json();
                let list = "";
                data.forEach(({id,title,category,img,price}) => {
                    let activeClass = "";
                    let activeText = "";
                    let numberFormat = new Intl.NumberFormat('ru-RU');
                    let priceFormat = numberFormat.format(price)
                    if(productsStore.indexOf(id) === -1) {
                        activeText = this.labelAdd;
                    }else {
                        activeClass = this.classNameActive;
                        activeText = this.labelRemove;
                    }
                    list += `
                        <li class="products-item">
                            <h3 class="products-item__title">${title}</h3>
                            <div class="products-item__img">
                                <img src="${img}">
                            </div>
                            <span class="products-item__category">Категория: ${category}</span>    
                            <span class="products-item__price">Цена: от ${priceFormat} ₽</span> 
                            <button class="products-item__btn ${activeClass}" onClick="productsPage.handleSetLocationStorage(this, '${id}')">${activeText}</button>  
                        </li>
                    `
                });

                let html = `
                <div class="container">
                    <ul class="products-list">
                        ${list}
                    </ul>
                </div>
                `
                ROOT_PRODUCTS.innerHTML = html;
            }
       }catch(e) {
            console.log(e)
       }
    }

}

let productsPage = new Products();

productsPage.render()