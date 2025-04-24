import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from './Toast';

interface ToastContextProps {
	showToast: (
		message: string,
		type?: 'success' | 'error' | 'info',
		duration?: number
	) => void;
	removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider');
	}
	return context;
};

interface ToastItem {
	id: string;
	message: string;
	type: 'success' | 'error' | 'info';
	duration: number;
}

interface ToastProviderProps {
	children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
	const [toasts, setToasts] = useState<ToastItem[]>([]);

	const showToast = (
		message: string,
		type: 'success' | 'error' | 'info' = 'success',
		duration: number = 3000
	) => {
		// Check if we already have a toast with this message and type
		const hasDuplicateToast = toasts.some(
			(toast) => toast.message === message && toast.type === type
		);

		// Only add the toast if it's not a duplicate
		if (!hasDuplicateToast) {
			const id = Math.random().toString(36).substring(2, 9);
			setToasts((prev) => [...prev, { id, message, type, duration }]);
		}
	};

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};

	return (
		<ToastContext.Provider value={{ showToast, removeToast }}>
			{children}
			<div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
				{toasts.map((toast) => (
					<Toast
						key={toast.id}
						message={toast.message}
						type={toast.type}
						duration={toast.duration}
						onClose={() => removeToast(toast.id)}
					/>
				))}
			</div>
		</ToastContext.Provider>
	);
};

export default ToastProvider;
