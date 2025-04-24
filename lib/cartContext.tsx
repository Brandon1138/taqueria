import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { CartService } from '../domain/services/CartService';
import { Product } from '../domain/models/Product';
import { CartItem } from '../domain/models/CartItem';
import { useToast } from '../components/ToastProvider';

interface CartContextType {
	items: CartItem[];
	addToCart: (product: Product, quantity?: number) => void;
	removeFromCart: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
	total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};

interface CartProviderProps {
	children: ReactNode;
	withToast?: boolean;
}

// Internal provider that uses ToastContext
const CartProviderWithToast: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [cartService] = useState(new CartService());
	const [items, setItems] = useState<CartItem[]>([]);
	const [total, setTotal] = useState(0);
	const { showToast } = useToast();

	useEffect(() => {
		setItems([...cartService.items]);
		setTotal(cartService.getTotal());
	}, [cartService.items]);

	const addToCart = (product: Product, quantity: number = 1) => {
		const isNewItem = !cartService.items.some(
			(item) => item.product.id === product.id
		);
		cartService.addItem(product, quantity);
		setItems([...cartService.items]);
		setTotal(cartService.getTotal());

		if (isNewItem) {
			showToast(`${product.name} added to cart`, 'success');
		} else {
			showToast(`${product.name} quantity updated`, 'info');
		}
	};

	const removeFromCart = (productId: string) => {
		const product = cartService.items.find(
			(item) => item.product.id === productId
		);
		const productName = product ? product.product.name : 'Item';

		cartService.removeItem(productId);
		setItems([...cartService.items]);
		setTotal(cartService.getTotal());

		showToast(`${productName} removed from cart`, 'info');
	};

	const updateQuantity = (productId: string, quantity: number) => {
		cartService.updateQuantity(productId, quantity);
		setItems([...cartService.items]);
		setTotal(cartService.getTotal());
	};

	const clearCart = () => {
		cartService.clear();
		setItems([]);
		setTotal(0);
		showToast('Cart cleared', 'info');
	};

	return (
		<CartContext.Provider
			value={{
				items,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				total,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

// Regular provider without toast functionality
const CartProviderWithoutToast: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [cartService] = useState(new CartService());
	const [items, setItems] = useState<CartItem[]>([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		setItems([...cartService.items]);
		setTotal(cartService.getTotal());
	}, [cartService.items]);

	const addToCart = (product: Product, quantity: number = 1) => {
		cartService.addItem(product, quantity);
		setItems([...cartService.items]);
		setTotal(cartService.getTotal());
	};

	const removeFromCart = (productId: string) => {
		cartService.removeItem(productId);
		setItems([...cartService.items]);
		setTotal(cartService.getTotal());
	};

	const updateQuantity = (productId: string, quantity: number) => {
		cartService.updateQuantity(productId, quantity);
		setItems([...cartService.items]);
		setTotal(cartService.getTotal());
	};

	const clearCart = () => {
		cartService.clear();
		setItems([]);
		setTotal(0);
	};

	return (
		<CartContext.Provider
			value={{
				items,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				total,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

// Main provider that decides which implementation to use
export const CartProvider: React.FC<CartProviderProps> = ({
	children,
	withToast = false,
}) => {
	if (withToast) {
		return <CartProviderWithToast>{children}</CartProviderWithToast>;
	}
	return <CartProviderWithoutToast>{children}</CartProviderWithoutToast>;
};
