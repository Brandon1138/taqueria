import React from 'react';
import type { AppProps } from 'next/app';
import { CartProvider } from '../lib/cartContext';
import ToastProvider from '../components/ToastProvider';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ToastProvider>
			<CartProvider withToast={true}>
				<Component {...pageProps} />
			</CartProvider>
		</ToastProvider>
	);
}
