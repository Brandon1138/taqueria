'use client';

import React from 'react';
import SmoothScrollExample from '../components/SmoothScrollExample';
import ParallaxScroll from '../components/ParallaxScroll';
import SmoothScroll from '../components/SmoothScroll';

export default function ScrollExamples() {
	return (
		<div className="min-h-screen bg-gray-100">
			{/* Hero Section with Parallax Effect */}
			<div className="relative h-[70vh] overflow-hidden flex items-center justify-center">
				<ParallaxScroll
					speed={0.3}
					direction="up"
					className="absolute inset-0 z-0"
				>
					<div className="h-[120%] w-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
				</ParallaxScroll>

				<div className="relative z-10 text-center text-white px-4">
					<SmoothScroll animation="fade" duration={1200}>
						<h1 className="text-5xl font-bold mb-6">
							Scroll Animation Examples
						</h1>
						<p className="text-xl max-w-2xl mx-auto">
							A demonstration of scroll-based animations using the Web
							Animations API and Intersection Observer - no external libraries
							needed!
						</p>
					</SmoothScroll>
				</div>
			</div>

			{/* Parallax Section */}
			<div className="py-20 bg-white">
				<div className="max-w-4xl mx-auto px-4">
					<SmoothScroll animation="slide-up" className="text-center mb-16">
						<h2 className="text-3xl font-bold mb-4">
							Parallax Scrolling Effects
						</h2>
						<p className="text-gray-700 max-w-2xl mx-auto">
							Parallax scrolling creates depth by moving elements at different
							speeds as you scroll.
						</p>
					</SmoothScroll>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
						<div className="relative overflow-hidden rounded-lg shadow-lg h-80">
							<ParallaxScroll
								speed={0.2}
								direction="down"
								className="h-full w-full"
							>
								<div className="h-full w-full bg-blue-100 flex items-center justify-center p-6">
									<div className="text-center">
										<h3 className="text-xl font-bold mb-2">
											Slow Down Movement
										</h3>
										<p>This element moves down slowly as you scroll</p>
									</div>
								</div>
							</ParallaxScroll>
						</div>

						<div className="relative overflow-hidden rounded-lg shadow-lg h-80">
							<ParallaxScroll
								speed={0.4}
								direction="up"
								className="h-full w-full"
							>
								<div className="h-full w-full bg-purple-100 flex items-center justify-center p-6">
									<div className="text-center">
										<h3 className="text-xl font-bold mb-2">
											Faster Up Movement
										</h3>
										<p>This element moves up faster as you scroll</p>
									</div>
								</div>
							</ParallaxScroll>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="relative overflow-hidden rounded-lg shadow-lg h-80">
							<ParallaxScroll
								speed={0.3}
								direction="left"
								className="h-full w-full"
							>
								<div className="h-full w-full bg-green-100 flex items-center justify-center p-6">
									<div className="text-center">
										<h3 className="text-xl font-bold mb-2">Left Movement</h3>
										<p>This element moves left as you scroll</p>
									</div>
								</div>
							</ParallaxScroll>
						</div>

						<div className="relative overflow-hidden rounded-lg shadow-lg h-80">
							<ParallaxScroll
								speed={0.3}
								direction="right"
								className="h-full w-full"
							>
								<div className="h-full w-full bg-yellow-100 flex items-center justify-center p-6">
									<div className="text-center">
										<h3 className="text-xl font-bold mb-2">Right Movement</h3>
										<p>This element moves right as you scroll</p>
									</div>
								</div>
							</ParallaxScroll>
						</div>
					</div>
				</div>
			</div>

			{/* Smooth Scroll Section */}
			<SmoothScrollExample />

			{/* Footer */}
			<footer className="py-10 bg-gray-800 text-white text-center">
				<SmoothScroll animation="fade">
					<p>Built with React 19 and Web Animations API</p>
				</SmoothScroll>
			</footer>
		</div>
	);
}
