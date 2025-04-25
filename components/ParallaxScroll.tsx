'use client';

import React, { useRef, useEffect, ReactNode } from 'react';

interface ParallaxScrollProps {
	children: ReactNode;
	speed?: number;
	direction?: 'up' | 'down' | 'left' | 'right';
	className?: string;
}

export default function ParallaxScroll({
	children,
	speed = 0.5,
	direction = 'up',
	className = '',
}: ParallaxScrollProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!ref.current) return;

			const element = ref.current;
			const rect = element.getBoundingClientRect();
			const windowHeight = window.innerHeight;

			// Check if element is in viewport
			if (rect.top < windowHeight && rect.bottom > 0) {
				// Calculate how far the element is from the top of the viewport
				// normalized to a value between 0 and 1
				const elementPosition =
					1 - (rect.top + rect.height) / (windowHeight + rect.height);

				// Calculate the transformation based on scroll position
				let translateValue = elementPosition * 100 * speed;
				let transform = '';

				// Apply transform based on direction
				switch (direction) {
					case 'up':
						transform = `translateY(${-translateValue}px)`;
						break;
					case 'down':
						transform = `translateY(${translateValue}px)`;
						break;
					case 'left':
						transform = `translateX(${-translateValue}px)`;
						break;
					case 'right':
						transform = `translateX(${translateValue}px)`;
						break;
				}

				element.style.transform = transform;
			}
		};

		// Add scroll event listener
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Call once to set initial position
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [speed, direction]);

	return (
		<div
			ref={ref}
			className={className}
			style={{
				willChange: 'transform',
				transition: 'transform 0.1s linear',
			}}
		>
			{children}
		</div>
	);
}
