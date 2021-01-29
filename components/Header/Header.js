class Header {
    handlerOpenShopping() {
        shoppingPage.render()
    }
    render(count) {
        const html = `
            <span class="shopping-link" onClick="header.handlerOpenShopping()"><img src="components/Header/img/shopping.svg"><span>${count}</span></span>
        `
        ROOT_HEADER.innerHTML = html;
    }
}
const header = new Header();
const productsStore = localStorageUtil.getProducts();
header.render(productsStore.length)