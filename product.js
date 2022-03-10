class Product {
	constructor(title, imgurl, desc, price) {
		this.title = title;
		this.imgurl = imgurl;
		this.desc = desc;
		this.price = price;
	}
}

class ProdElement {
	constructor(product) {
		this.product = product;
	}

	addToCart() {
		console.log('object is added ...');
		console.log(this.product);
	}

	createSingleProduct() {
		const prodEl = document.createElement('li');
		prodEl.className = 'product-item';
		prodEl.innerHTML = `
    <div>
    <img src='${this.product.imgurl}' alt='${this.product.title}'>
    <div class="product-item__content">
  <h2>${this.product.price}</h2>
  <h1>${this.product.desc}</h1>
  <button>add to cart</button>
    </div>
    </div>
    `;
		const btnadd = prodEl.querySelector('button');
		btnadd.addEventListener('click', this.addToCart.bind(this));

		return prodEl;
	}
}
class ShoppingCart {
	items = [];
	render() {
		const cartEl = document.createElement('section');
		cartEl.innerHTML = `
        <h2>Total Amount :\$${0} </h2>
        <button>Order now </button>

        `;
		cartEl.className = 'cart';
		return cartEl;
	}
}
class ProductList {
	products = [
		new Product(
			'pillow',
			'https://c-static.smartphoto.com/structured/repositoryimage/productcategory/fun_ideas/pillow/topimages/0013/image/carrousel9.jpg',
			19,
			'soft pillow'
		),
		new Product(
			'Carpet',
			'https://www.tapislux.com/2101-medium_default/carpet-modern-design-border-ornament-marble-optical-black-red-white.jpg',
			40,
			'soft Carpet'
		),
	];
	constructor() {}
	render() {
		const prodList = document.createElement('ul');
		prodList.className = 'product-list';
		for (const prod of this.products) {
			const prodItem = new ProdElement(prod);
			const prodEl = prodItem.createSingleProduct();
			prodList.append(prodEl);
		}
		return prodList;
	}
}

class Shop {
	render() {
		const renderHook = document.getElementById('app');
		const cart = new ShoppingCart();
		const cartEl = cart.render();
		const productList = new ProductList();
		const prodListEl = productList.render();
		renderHook.append(cartEl);
		renderHook.append(prodListEl);
	}
}

const shop = new Shop();
shop.render();
