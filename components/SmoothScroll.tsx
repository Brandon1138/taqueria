'use client';

import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface SmoothScrollProps {
	children: ReactNode;
	animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'zoom';
	delay?: number;
	duration?: number;
	threshold?: number;
	className?: string;
	once?: boolean;
}

export default function SmoothScroll({
	children,
	animation = 'fade',
	delay = 0,
	duration = 800,
	threshold = 0.1,
	className = '',
	once = true,
}: SmoothScrollProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					if (once) {
						observer.unobserve(entry.target);
					}
				} else if (!once) {
					setIsVisible(false);
				}
			},
			{
				threshold,
				rootMargin: '0px 0px -100px 0px',
			}
		);

		const currentRef = ref.current;
		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [threshold, once]);

	// Define animations
	const animations = {
		fade: {
			hidden: { opacity: 0 },
			visible: { opacity: 1 },
		},
		'slide-up': {
			hidden: { opacity: 0, transform: 'translateY(50px)' },
			visible: { opacity: 1, transform: 'translateY(0)' },
		},
		'slide-left': {
			hidden: { opacity: 0, transform: 'translateX(-50px)' },
			visible: { opacity: 1, transform: 'translateX(0)' },
		},
		'slide-right': {
			hidden: { opacity: 0, transform: 'translateX(50px)' },
			visible: { opacity: 1, transform: 'translateX(0)' },
		},
		zoom: {
			hidden: { opacity: 0, transform: 'scale(0.8)' },
			visible: { opacity: 1, transform: 'scale(1)' },
		},
	};

	// Get current animation styles
	const currentAnimation = animations[animation];

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		if (isVisible) {
			// Apply visible animation
			element.animate([currentAnimation.hidden, currentAnimation.visible], {
				duration,
				fill: 'forwards',
				delay,
				easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
			});
		} else if (!once) {
			// Apply hidden animation when scrolling away (if once is false)
			element.animate([currentAnimation.visible, currentAnimation.hidden], {
				duration,
				fill: 'forwards',
				easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
			});
		}
	}, [isVisible, animation, duration, delay]);

	return (
		<div
			ref={ref}
			className={className}
			style={{
				opacity: 0,
				willChange: 'opacity, transform',
			}}
		>
			{children}
		</div>
	);
}
