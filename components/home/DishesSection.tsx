import React from 'react';
import Image from 'next/image';
import SmoothScroll from '../SmoothScroll';

const DishesSection: React.FC = () => {
	return (
		<div id="dishes" className="py-16">
			<div className="text-center mb-12 relative">
				<SmoothScroll animation="fade" duration={800}>
					<h2
						className="text-4xl font-extrabold text-center text-white uppercase tracking-wider relative z-10 inline-block px-8 py-2"
						style={{
							fontFamily: "'Courier New', monospace",
							textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
							background:
								'linear-gradient(to right, rgba(153, 27, 27, 0.8), rgba(120, 20, 20, 0.8))',
							borderRadius: '0.5rem',
							boxShadow:
								'0 4px 10px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(255,255,255,0.1)',
							transform: 'rotate(-1deg)',
						}}
					>
						See our Dishes
					</h2>
					<div
						className="absolute h-1 w-32 bg-amber-300 left-1/2 transform -translate-x-1/2 bottom-0 z-0"
						style={{
							boxShadow: '0 0 8px rgba(251, 191, 36, 0.6)',
							transform: 'translateY(6px) rotate(1deg)',
						}}
					></div>
				</SmoothScroll>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Wrap Dish */}
				<SmoothScroll animation="slide-up" delay={100}>
					<div className="relative overflow-hidden rounded-lg transform transition-all hover:scale-[1.02] shadow-xl">
						<div
							className="absolute inset-0 bg-neutral-800 rounded-lg"
							style={{
								backgroundImage:
									"url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
								borderRadius: '0.75rem',
								boxShadow:
									'inset 0 0 0 2px rgba(255,255,255,0.1), 0 4px 10px rgba(0,0,0,0.3)',
							}}
						></div>
						<div className="relative aspect-square">
							<Image
								src="/images/wrap.webp"
								alt="Wrap"
								fill
								sizes="(max-width: 768px) 100vw, 33vw"
								style={{ objectFit: 'cover' }}
								className="rounded-t-lg"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
							<div className="absolute bottom-4 left-4 right-4">
								<h3 className="text-white text-xl font-bold">Fresh Wraps</h3>
								<p className="text-gray-200 text-sm">Light and delicious</p>
							</div>
						</div>
					</div>
				</SmoothScroll>

				{/* Nachos Dish */}
				<SmoothScroll animation="slide-up" delay={300}>
					<div className="relative overflow-hidden rounded-lg transform transition-all hover:scale-[1.02] shadow-xl">
						<div
							className="absolute inset-0 bg-neutral-800 rounded-lg"
							style={{
								backgroundImage:
									"url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
								borderRadius: '0.75rem',
								boxShadow:
									'inset 0 0 0 2px rgba(255,255,255,0.1), 0 4px 10px rgba(0,0,0,0.3)',
							}}
						></div>
						<div className="relative aspect-square">
							<Image
								src="/images/nachos.webp"
								alt="Nachos"
								fill
								sizes="(max-width: 768px) 100vw, 33vw"
								style={{ objectFit: 'cover' }}
								className="rounded-t-lg"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
							<div className="absolute bottom-4 left-4 right-4">
								<h3 className="text-white text-xl font-bold">Loaded Nachos</h3>
								<p className="text-gray-200 text-sm">Perfect for sharing</p>
							</div>
						</div>
					</div>
				</SmoothScroll>

				{/* Burger Dish */}
				<SmoothScroll animation="slide-up" delay={500}>
					<div className="relative overflow-hidden rounded-lg transform transition-all hover:scale-[1.02] shadow-xl">
						<div
							className="absolute inset-0 bg-neutral-800 rounded-lg"
							style={{
								backgroundImage:
									"url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
								borderRadius: '0.75rem',
								boxShadow:
									'inset 0 0 0 2px rgba(255,255,255,0.1), 0 4px 10px rgba(0,0,0,0.3)',
							}}
						></div>
						<div className="relative aspect-square">
							<Image
								src="/images/burger.webp"
								alt="Burger"
								fill
								sizes="(max-width: 768px) 100vw, 33vw"
								style={{ objectFit: 'cover' }}
								className="rounded-t-lg"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
							<div className="absolute bottom-4 left-4 right-4">
								<h3 className="text-white text-xl font-bold">
									Signature Burger
								</h3>
								<p className="text-gray-200 text-sm">Our customer favorite</p>
							</div>
						</div>
					</div>
				</SmoothScroll>
			</div>
		</div>
	);
};

export default DishesSection;
