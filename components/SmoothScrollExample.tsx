'use client';

import React from 'react';
import SmoothScroll from './SmoothScroll';

export default function SmoothScrollExample() {
	return (
		<div className="flex flex-col gap-32 py-20 max-w-4xl mx-auto">
			{/* Fade Animation */}
			<SmoothScroll
				animation="fade"
				className="p-8 bg-white rounded-lg shadow-lg"
			>
				<h2 className="text-2xl font-bold mb-4">Fade In Animation</h2>
				<p className="text-gray-700">
					This element fades in as you scroll down to it. The animation is
					triggered when the element enters the viewport.
				</p>
			</SmoothScroll>

			{/* Slide Up Animation */}
			<SmoothScroll
				animation="slide-up"
				className="p-8 bg-white rounded-lg shadow-lg"
			>
				<h2 className="text-2xl font-bold mb-4">Slide Up Animation</h2>
				<p className="text-gray-700">
					This element slides up as you scroll down to it. Notice how it starts
					from below and moves into its final position.
				</p>
			</SmoothScroll>

			{/* Slide Left Animation */}
			<SmoothScroll
				animation="slide-left"
				className="p-8 bg-white rounded-lg shadow-lg"
			>
				<h2 className="text-2xl font-bold mb-4">Slide Left Animation</h2>
				<p className="text-gray-700">
					This element slides in from the right as you scroll down to it. It's
					great for highlighting content that should draw attention from the
					side.
				</p>
			</SmoothScroll>

			{/* Slide Right Animation */}
			<SmoothScroll
				animation="slide-right"
				className="p-8 bg-white rounded-lg shadow-lg"
			>
				<h2 className="text-2xl font-bold mb-4">Slide Right Animation</h2>
				<p className="text-gray-700">
					This element slides in from the left as you scroll down to it. It
					provides a nice contrast when used alongside slide-left animations.
				</p>
			</SmoothScroll>

			{/* Zoom Animation */}
			<SmoothScroll
				animation="zoom"
				className="p-8 bg-white rounded-lg shadow-lg"
			>
				<h2 className="text-2xl font-bold mb-4">Zoom Animation</h2>
				<p className="text-gray-700">
					This element zooms in as you scroll down to it. It starts slightly
					smaller and scales up to its normal size.
				</p>
			</SmoothScroll>

			{/* Animated with delay */}
			<SmoothScroll
				animation="fade"
				delay={300}
				className="p-8 bg-white rounded-lg shadow-lg"
			>
				<h2 className="text-2xl font-bold mb-4">Delayed Animation</h2>
				<p className="text-gray-700">
					This element has a delay of 300ms before starting its animation.
					Delays can create a nice staggered effect when you have multiple
					elements.
				</p>
			</SmoothScroll>

			{/* Animated with custom duration */}
			<SmoothScroll
				animation="slide-up"
				duration={1500}
				className="p-8 bg-white rounded-lg shadow-lg"
			>
				<h2 className="text-2xl font-bold mb-4">Slow Animation</h2>
				<p className="text-gray-700">
					This element has a longer animation duration (1.5 seconds). Slower
					animations can create a more dramatic effect for important content.
				</p>
			</SmoothScroll>

			{/* Animation that repeats (once = false) */}
			<SmoothScroll
				animation="fade"
				once={false}
				className="p-8 bg-white rounded-lg shadow-lg"
			>
				<h2 className="text-2xl font-bold mb-4">Repeating Animation</h2>
				<p className="text-gray-700">
					This element will animate every time it enters or leaves the viewport.
					Try scrolling up and down to see it in action!
				</p>
			</SmoothScroll>
		</div>
	);
}
