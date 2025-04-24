import React from 'react';
import Image from 'next/image';

interface HeroProps {
	title?: string;
	subtitle?: string;
}

const Hero: React.FC<HeroProps> = ({
	title = 'Welcome to Taqueria',
	subtitle = 'Authentic Mexican Street Food',
}) => {
	return (
		<div className="relative h-screen w-full -mt-16">
			{/* Video background */}
			<video
				autoPlay
				muted
				loop
				playsInline
				className="absolute inset-0 w-full h-full object-cover"
			>
				<source src="/hero_video.mp4" type="video/mp4" />
			</video>

			{/* Subtle dark overlay for text readability */}
			<div className="absolute inset-0 bg-black/30" />

			{/* Content */}
			<div className="relative h-full w-full flex flex-col items-center justify-center px-4">
				{/* Logo container with specific dimensions */}
				<div className="w-full max-w-4xl h-48 relative mb-8">
					<Image
						src="/taqueria_logo_bg.svg"
						alt="Taqueria Logo"
						fill
						priority
						className="object-contain"
					/>
				</div>

				<p className="text-xl md:text-2xl text-white text-center max-w-2xl font-light">
					{subtitle}
				</p>

				{/* Contact information and social media */}
				<div className="absolute bottom-16 w-full max-w-6xl flex justify-between px-4">
					{/* Contact information */}
					<div className="flex items-center gap-8 bg-black bg-opacity-50 px-8 py-4 rounded-lg shadow-lg">
						{/* Location */}
						<div className="flex flex-col items-center w-24">
							<div className="bg-[#8B1A1A] rounded-full p-3 mb-2 shadow-md">
								<svg
									className="w-6 h-6 text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
										clipRule="evenodd"
									></path>
								</svg>
							</div>
							<div className="text-center">
								<p className="text-sm text-white font-medium">123 Mihai Emi</p>
							</div>
						</div>

						{/* Phone */}
						<div className="flex flex-col items-center w-24">
							<div className="bg-[#8B1A1A] rounded-full p-3 mb-2 shadow-md">
								<svg
									className="w-6 h-6 text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
								</svg>
							</div>
							<p className="text-sm text-white font-medium">0314058226</p>
						</div>

						{/* Hours */}
						<div className="flex flex-col items-center w-24">
							<div className="bg-[#8B1A1A] rounded-full p-3 mb-2 shadow-md">
								<svg
									className="w-6 h-6 text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
										clipRule="evenodd"
									></path>
								</svg>
							</div>
							<div className="flex items-center">
								<p className="text-sm text-white">12:00 - 22:00</p>
							</div>
						</div>
					</div>

					{/* Social media icons */}
					<div className="flex items-center gap-8 bg-black bg-opacity-50 px-8 py-4 rounded-lg shadow-lg">
						{/* Facebook */}
						<div className="flex flex-col items-center w-24">
							<div className="bg-[#8B1A1A] rounded-full p-3 mb-2 shadow-md hover:bg-red-700 transition-colors cursor-pointer">
								<svg
									className="w-6 h-6 text-white"
									fill="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z" />
								</svg>
							</div>
							<p className="text-sm text-white font-medium">Facebook</p>
						</div>
						{/* Twitter */}
						<div className="flex flex-col items-center w-24">
							<div className="bg-[#8B1A1A] rounded-full p-3 mb-2 shadow-md hover:bg-red-700 transition-colors cursor-pointer">
								<svg
									className="w-6 h-6 text-white"
									fill="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M19.9441 7.92638C19.9568 8.10403 19.9568 8.28173 19.9568 8.45938C19.9568 13.8982 15.8325 20.1216 8.29441 20.1216C5.97207 20.1216 3.81473 19.4492 2.00098 18.2886C2.32867 18.3267 2.64379 18.3394 2.98402 18.3394C4.90645 18.3394 6.67004 17.6924 8.07867 16.5953C6.27746 16.5572 4.76637 15.3838 4.24273 13.7813C4.5 13.8194 4.75723 13.8448 5.02703 13.8448C5.40088 13.8448 5.77469 13.7939 6.1231 13.7051C4.24273 13.3141 2.84668 11.6735 2.84668 9.69231V9.64162C3.39672 9.94416 4.03652 10.1345 4.71371 10.1599C3.62285 9.43349 2.87156 8.18925 2.87156 6.79321C2.87156 6.04193 3.07168 5.35224 3.42012 4.75636C5.44883 7.24923 8.4399 8.85954 11.7502 9.03719C11.6868 8.7347 11.6487 8.41962 11.6487 8.10449C11.6487 5.84259 13.4883 4.00293 15.7568 4.00293C16.9302 4.00293 17.9956 4.49171 18.7469 5.27795C19.6865 5.10034 20.588 4.75635 21.3902 4.28014C21.0873 5.24053 20.4348 6.04198 19.5714 6.54329C20.4094 6.45646 21.2219 6.2279 21.9741 5.9129C21.3902 6.72688 20.6894 7.4528 19.9441 7.92638Z" />
								</svg>
							</div>
							<p className="text-sm text-white font-medium">Twitter</p>
						</div>
						{/* Instagram */}
						<div className="flex flex-col items-center w-24">
							<div className="bg-[#8B1A1A] rounded-full p-3 mb-2 shadow-md hover:bg-red-700 transition-colors cursor-pointer">
								<svg
									className="w-6 h-6 text-white"
									fill="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M12.001 6.50195C8.96875 6.50195 6.50195 8.96875 6.50195 12.001C6.50195 15.0332 8.96875 17.5 12.001 17.5C15.0332 17.5 17.5 15.0332 17.5 12.001C17.5 8.96875 15.0332 6.50195 12.001 6.50195ZM12.001 15.459C10.1187 15.459 8.54297 13.8833 8.54297 12.001C8.54297 10.1187 10.1187 8.54297 12.001 8.54297C13.8833 8.54297 15.459 10.1187 15.459 12.001C15.459 13.8833 13.8833 15.459 12.001 15.459ZM18.6177 6.30079C18.6177 7.00391 18.0498 7.57178 17.3467 7.57178C16.6436 7.57178 16.0757 7.00391 16.0757 6.30079C16.0757 5.59766 16.6436 5.02979 17.3467 5.02979C18.0498 5.02979 18.6177 5.59766 18.6177 6.30079ZM21.9511 7.58936C21.8789 5.97852 21.4827 4.53126 20.292 3.3405C19.1013 2.14973 17.654 1.75355 16.0432 1.68139C14.376 1.59766 9.62598 1.59766 7.95876 1.68139C6.34792 1.75355 4.90066 2.14973 3.70989 3.3405C2.51911 4.53126 2.12293 5.97852 2.05077 7.58936C1.96704 9.25659 1.96704 14.0066 2.05077 15.6738C2.12293 17.2847 2.51911 18.7319 3.70989 19.9227C4.90066 21.1135 6.34792 21.5096 7.95876 21.5818C9.62598 21.6655 14.376 21.6655 16.0432 21.5818C17.654 21.5096 19.1013 21.1135 20.292 19.9227C21.4827 18.7319 21.8789 17.2847 21.9511 15.6738C22.0348 14.0066 22.0348 9.25659 21.9511 7.58936ZM19.6514 17.4541C19.2744 18.3745 18.5538 19.0951 17.6334 19.4721C16.2354 20.0225 13.1006 19.9023 12.001 19.9023C10.9014 19.9023 7.76661 20.0225 6.36864 19.4721C5.44825 19.0951 4.72766 18.3745 4.35059 17.4541C3.80019 16.0562 3.92043 12.9214 3.92043 12.001C3.92043 11.0806 3.80019 7.94575 4.35059 6.54778C4.72766 5.62739 5.44825 4.9068 6.36864 4.52973C7.76661 3.97934 10.9014 4.09958 12.001 4.09958C13.1006 4.09958 16.2354 3.97934 17.6334 4.52973C18.5538 4.9068 19.2744 5.62739 19.6514 6.54778C20.2018 7.94575 20.0816 11.0806 20.0816 12.001C20.0816 12.9214 20.2018 16.0562 19.6514 17.4541Z" />
								</svg>
							</div>
							<p className="text-sm text-white font-medium">Instagram</p>
						</div>
					</div>
				</div>

				{/* Scroll indicator */}
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
					<svg
						className="w-6 h-6 text-white"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default Hero;
