import React from 'react';
import Image from 'next/image';

const MobileAppSection: React.FC = () => {
	return (
		<div id="app" className="py-16">
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
					Download our Mobile App
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
					<div className="flex flex-col md:flex-row items-center justify-between">
						{/* Text Content */}
						<div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-8">
							<div className="inline-block mb-4 text-amber-300 border-b-2 border-amber-300 pb-1">
								<span
									className="text-lg font-bold uppercase tracking-wide"
									style={{ fontFamily: "'Courier New', monospace" }}
								>
									NEW
								</span>
							</div>
							<h3 className="text-white text-2xl font-bold mb-4">
								The Taqueria Experience
								<br />
								In Your Pocket
							</h3>
							<p className="text-gray-300 mb-6 leading-relaxed">
								Enjoy our delicious Mexican street food anytime, anywhere! Order
								directly from your phone, track your delivery in real-time, and
								earn rewards with every purchase.
							</p>
							<a
								href="https://play.google.com/store/apps/details?id=com.restaumatic.taqueria&pli=1"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center bg-red-800 text-white px-6 py-3 rounded-md font-bold 
                hover:bg-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none 
                transition-colors transform hover:-translate-y-0.5 shadow-md border border-red-700
                uppercase tracking-wide"
								style={{ fontFamily: "'Courier New', monospace" }}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 mr-2"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
									<path
										fillRule="evenodd"
										d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
										clipRule="evenodd"
									/>
								</svg>
								Get it on Google Play
							</a>
						</div>

						{/* Phone Mockup */}
						<div className="md:w-1/2 flex justify-center relative">
							<div className="relative w-48 h-80 bg-black rounded-3xl overflow-hidden border-4 border-neutral-800 shadow-xl transform -rotate-2">
								{/* Phone Screen */}
								<div className="absolute inset-0 bg-neutral-800">
									{/* App UI Mockup */}
									<div className="h-6 bg-red-900 flex items-center justify-center">
										<div className="w-16 h-1 bg-neutral-400 rounded-full"></div>
									</div>
									<div className="p-3">
										{/* App Logo */}
										<div className="mx-auto w-16 h-16 bg-red-900 rounded-xl flex items-center justify-center mb-3">
											<Image
												src="/taqueria_logo_white.svg"
												alt="Taqueria App Logo"
												width={40}
												height={40}
												quality={75}
												style={{ objectFit: 'contain' }}
											/>
										</div>
										{/* Menu Items */}
										<div className="space-y-3">
											<div className="h-14 bg-neutral-700 rounded-lg flex p-2">
												<div className="w-10 h-10 bg-red-800 rounded mr-2"></div>
												<div className="flex-1">
													<div className="w-20 h-2 bg-neutral-400 rounded mb-1"></div>
													<div className="w-16 h-2 bg-neutral-500 rounded"></div>
												</div>
											</div>
											<div className="h-14 bg-neutral-700 rounded-lg flex p-2">
												<div className="w-10 h-10 bg-red-800 rounded mr-2"></div>
												<div className="flex-1">
													<div className="w-24 h-2 bg-neutral-400 rounded mb-1"></div>
													<div className="w-20 h-2 bg-neutral-500 rounded"></div>
												</div>
											</div>
											<div className="h-14 bg-neutral-700 rounded-lg flex p-2">
												<div className="w-10 h-10 bg-red-800 rounded mr-2"></div>
												<div className="flex-1">
													<div className="w-16 h-2 bg-neutral-400 rounded mb-1"></div>
													<div className="w-12 h-2 bg-neutral-500 rounded"></div>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Phone Home Button */}
								<div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-neutral-700 rounded-full"></div>
							</div>

							{/* Decorative elements */}
							<div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-300 rounded-full opacity-30 transform rotate-12"></div>
							<div className="absolute bottom-8 -left-6 w-12 h-12 bg-red-700 rounded-full opacity-20"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MobileAppSection;
