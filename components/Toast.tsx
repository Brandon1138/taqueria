import React, { useState, useEffect } from 'react';

interface ToastProps {
	message: string;
	type?: 'success' | 'error' | 'info';
	duration?: number;
	onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
	message,
	type = 'success',
	duration = 3000,
	onClose,
}) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
			setTimeout(() => {
				onClose();
			}, 300); // Wait for fade-out animation
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	// Define styles based on type
	let bgColor = 'bg-green-500';
	let icon = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M5 13l4 4L19 7"
			/>
		</svg>
	);

	if (type === 'error') {
		bgColor = 'bg-red-500';
		icon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		);
	} else if (type === 'info') {
		bgColor = 'bg-blue-500';
		icon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		);
	}

	return (
		<div
			className={`fixed bottom-4 right-4 flex items-center p-4 rounded-lg shadow-lg text-white ${bgColor} transform transition-all duration-300 ${
				visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
			}`}
		>
			<div className="mr-2">{icon}</div>
			<div className="font-medium">{message}</div>
			<button
				onClick={() => {
					setVisible(false);
					setTimeout(onClose, 300);
				}}
				className="ml-4 text-white focus:outline-none"
				aria-label="Close notification"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
		</div>
	);
};

export default Toast;
