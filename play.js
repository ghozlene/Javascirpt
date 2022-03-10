class Product {
	constructor(title, imageUrl, price, discription) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.discription = discription;
		this.price = price;
	}
}
class ElementAttribute {
	constructor(attrName, attrValue) {
		this.name = attrName;
		this.value = attrValue;
	}
}
class Component {
	constructor(renderHookId, shouldRender = true) {
		this.hookId = renderHookId;
		if (shouldRender) {
			this.render();
		}
	}
	render() {}
	createRootElement(tag, cssClasses, attribute) {
		const rootElement = document.createElement(tag);
		if (cssClasses) {
			rootElement.className = cssClasses;
		}
		if (attribute && attribute.length > 0) {
			for (const attr of attribute) {
				rootElement.setAttribute(attr.name, attr.value);
			}
		}
		document.getElementById(this.hookId).append(rootElement);
		return rootElement;
	}
}

class ProdEL extends Component {
	constructor(product, renderHookId) {
		super(renderHookId, false);
		this.product = product;
		this.render();
	}
	adding() {
		App.addItemToCart(this.product);
	}

	createProdEl() {
		const prodEl = this.createRootElement('li', 'product-item');

		prodEl.innerHTML = `
			<div>
			<img src='${this.product.imageUrl}' alt='${this.product.title}'>
			<div class="product-item__content">
			<h2>${this.product.title}</h2>
			<h3>\$${this.product.price}</h3>
			<p>${this.product.discription}</p>
			<button>add to cart</button>
			</div>

			</div>
			`;
		const addtoCart = prodEl.querySelector('button');
		addtoCart.addEventListener('click', this.adding.bind(this));
	}
}

class Cart extends Component {
	items = [];

	set cartItems(value) {
		this.items = value;
		this.totalAmount.innerHTML = `	<h2>Total Amount ${this.totalAmountc}</h2>`;
	}
	get totalAmountc() {
		const sum = this.items.reduce((prev, curr) => prev + curr.price, 0);
		return sum;
	}
	addProduct(product) {
		const updateItems = [...this.items];
		updateItems.push(product);
		this.cartItems = updateItems;
	}
	render() {
		const cartEl = this.createRootElement('section', 'cart');

		cartEl.innerHTML = `
		<h2>Total: \$${0}</h2>
        <button>Order Now!</button>
		`;

		this.totalAmount = cartEl.querySelector('h2');
	}
	constructor(renderHookId) {
		super(renderHookId);
	}
}
class ProductList extends Component {
	products = [];
	constructor(renderHookId) {
		super(renderHookId);
		this.fetchProducts();
	}

	fetchProducts() {
		this.products = [
			new Product(
				'a pillow',
				'https://c-static.smartphoto.com/structured/repositoryimage/productcategory/fun_ideas/pillow/topimages/0013/image/carrousel9.jpg',
				19,
				'soft pillow'
			),
			new Product(
				' a carpet',
				'https://www.tapislux.com/2101-medium_default/carpet-modern-design-border-ornament-marble-optical-black-red-white.jpg',
				40,
				'soft pillow'
			),
		];
		this.renderProducts();
	}
	renderProducts() {
		for (const prod of this.products) {
			new ProdEL(prod, 'prod-list');
		}
	}
	render() {
		this.createRootElement('ul', 'product-list', [
			new ElementAttribute('id', 'prod-list'),
		]);

		if (this.products && this.products.length > 0) {
			this.renderProducts();
		}
	}
}

class Shopping extends Component {
	constructor() {
		super();
	}
	render() {
		this.cart = new Cart('app');

		new ProductList('app');
	}
}

class App {
	static cart;
	static init() {
		const shoppingRender = new Shopping();

		this.cart = shoppingRender.cart;
	}
	static addItemToCart(product) {
		this.cart.addProduct(product);
	}
}

App.init();
