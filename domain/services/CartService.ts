import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';

export class CartService {
	items: CartItem[] = [];

	addItem(product: Product, quantity: number = 1): void {
		const existingItem = this.items.find(
			(item) => item.product.id === product.id
		);

		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			this.items.push({ product, quantity });
		}
	}

	removeItem(productId: string): void {
		this.items = this.items.filter((item) => item.product.id !== productId);
	}

	updateQuantity(productId: string, quantity: number): void {
		const item = this.items.find((item) => item.product.id === productId);
		if (item) {
			item.quantity = quantity;
		}
	}

	getTotal(): number {
		return this.items.reduce(
			(total, item) => total + item.product.price * item.quantity,
			0
		);
	}

	clear(): void {
		this.items = [];
	}
}
