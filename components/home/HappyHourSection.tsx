import React from 'react';
import Image from 'next/image';

const HappyHourSection: React.FC = () => {
	return (
		<div id="happy-hour" className="py-16">
			<div className="text-center mb-12 relative">
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
					Happy Hour
				</h2>
				<div
					className="absolute h-1 w-32 bg-amber-300 left-1/2 transform -translate-x-1/2 bottom-0 z-0"
					style={{
						boxShadow: '0 0 8px rgba(251, 191, 36, 0.6)',
						transform: 'translateY(6px) rotate(1deg)',
					}}
				></div>
			</div>

			<div className="flex flex-col items-center">
				<div
					className="relative overflow-visible rounded-lg transform transition-all shadow-xl 
          w-full bg-gradient-to-br from-red-900 to-neutral-900 p-8"
					style={{
						backgroundImage:
							"url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
						borderRadius: '0.75rem',
						boxShadow:
							'inset 0 0 0 2px rgba(255,255,255,0.1), 0 4px 10px rgba(0,0,0,0.3)',
					}}
				>
					{/* Special offer tag */}
					<div className="absolute -top-2 -right-2 z-10">
						<div
							className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-6 shadow-lg font-bold uppercase tracking-wider text-sm transform rotate-6 relative overflow-hidden"
							style={{
								fontFamily: "'Courier New', monospace",
								boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
								borderRadius: '4px',
								textShadow: '0 1px 2px rgba(0,0,0,0.3)',
								border: '1px solid rgba(255,255,255,0.2)',
							}}
						>
							<span className="relative z-10">Special Offer</span>
							<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-transparent opacity-20"></div>
						</div>
					</div>

					<div className="flex flex-col md:flex-row items-center justify-between">
						{/* Left Side - Promo Image */}
						<div className="md:w-1/2 flex justify-center relative mb-12 md:mb-0">
							<div className="relative w-72 h-72 flex items-center justify-center">
								{/* Improved Time/Day Info */}
								<div className="absolute -top-10 left-[45%] transform -translate-x-1/2 z-20 w-64 text-center">
									<div
										className="text-lg font-bold text-white uppercase tracking-wide"
										style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}
									>
										Monday - Friday
									</div>
									<div
										className="text-2xl font-extrabold text-amber-300"
										style={{ textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}
									>
										4:00 PM - 8:00 PM
									</div>
								</div>

								{/* Dark background circle */}
								<div className="bg-neutral-900 w-64 h-64 rounded-full flex items-center justify-center relative">
									{/* 50% OFF text */}
									<div className="flex flex-col items-center justify-center text-white">
										<div
											className="text-7xl font-extrabold"
											style={{
												fontFamily: "'Courier New', monospace",
												textShadow: '2px 2px 0 rgba(139, 0, 0, 0.5)',
											}}
										>
											50%
										</div>
										<div
											className="text-5xl font-extrabold"
											style={{
												fontFamily: "'Courier New', monospace",
												textShadow: '2px 2px 0 rgba(139, 0, 0, 0.5)',
											}}
										>
											OFF
										</div>
									</div>
								</div>

								{/* Cocktail image */}
								<div className="absolute -left-20 bottom-0 z-10 transform -rotate-6">
									<div className="relative h-60 w-38">
										<Image
											src="/images/cocktail.webp"
											alt="Cocktail"
											width={150}
											height={241}
											quality={75}
											style={{ objectFit: 'contain' }}
											className="drop-shadow-lg"
										/>
									</div>
								</div>

								{/* Beer image */}
								<div className="absolute -right-8 bottom-[68px] z-10 transform rotate-6">
									<div className="relative h-44 w-22">
										<Image
											src="/images/corona.webp"
											alt="Beer"
											width={90}
											height={180}
											quality={75}
											style={{ objectFit: 'contain' }}
											className="drop-shadow-lg"
										/>
									</div>
								</div>

								{/* Footer Quote */}
								<div className="absolute -bottom-10 text-center w-full z-20 -ml-4">
									<div
										className="text-xs text-gray-300 font-medium uppercase tracking-wider"
										style={{ fontFamily: "'Courier New', monospace" }}
									>
										BRING YOUR FRIENDS, NOT YOUR PROBLEMS
									</div>
									<div className="flex justify-center mt-2">
										<div className="w-6 h-1 bg-red-900 rounded-full"></div>
										<div className="w-1 h-1 bg-red-900 rounded-full mx-2"></div>
										<div className="w-1 h-1 bg-red-900 rounded-full"></div>
									</div>
								</div>
							</div>
						</div>

						{/* Right Side - Text Content */}
						<div className="md:w-1/2 text-center md:text-left md:pl-8">
							<div className="inline-block mb-4 border-b-2 border-amber-300 pb-1">
								<span
									className="text-lg font-bold uppercase tracking-wide text-amber-300"
									style={{ fontFamily: "'Courier New', monospace" }}
								>
									Limited Time
								</span>
							</div>

							<h3 className="text-gray-200 text-4xl font-bold mb-2">
								Happy Hour
							</h3>

							<h4 className="text-amber-300 text-2xl font-bold mb-6">
								50% OFF All Drinks
							</h4>

							<p className="text-gray-300 mb-8 leading-relaxed">
								From Monday to Friday between 4:00 PM - 8:00 PM, enjoy all your
								favorite drinks at half price. The perfect time to unwind after
								work with friends and experience our signature cocktails and
								selection of beers!
							</p>

							<div className="flex flex-wrap gap-4 mb-6">
								<div className="flex items-center text-gray-200">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-amber-300 mr-2"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
											clipRule="evenodd"
										/>
									</svg>
									<span className="text-sm">Monday - Friday</span>
								</div>
								<div className="flex items-center text-gray-200">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-amber-300 mr-2"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
										<path
											fillRule="evenodd"
											d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
											clipRule="evenodd"
										/>
									</svg>
									<span className="text-sm">All Drinks Included</span>
								</div>
							</div>

							<a
								href="/menu"
								className="inline-flex items-center bg-red-800 text-white px-6 py-3 rounded-md font-bold 
                hover:bg-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none 
                transition-colors transform hover:-translate-y-0.5 shadow-md border border-red-700
                uppercase tracking-wide"
								style={{ fontFamily: "'Courier New', monospace" }}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
									/>
								</svg>
								View Menu
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HappyHourSection;
