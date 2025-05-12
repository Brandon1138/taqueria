import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import ParallaxScroll from './ParallaxScroll';
import SmoothScroll from './SmoothScroll';
import Link from 'next/link';

interface HeroProps {
	title?: string;
	subtitle?: string;
}

const Hero: React.FC<HeroProps> = ({
	title = 'Welcome to Taqueria',
	subtitle = 'Authentic Mexican Street Food',
}) => {
	const [isMobile, setIsMobile] = useState(false);

	// Add smooth scroll function
	const smoothScrollTo = useCallback((id: string) => {
		// Special case for home - scroll to top
		if (id === 'home') {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
			return;
		}

		// Try to find the element directly
		const element = document.getElementById(id);

		if (element) {
			const headerOffset = 80;
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.scrollY - headerOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			});
		} else {
			console.warn(`Element with id "${id}" not found on the page`);
		}
	}, []);

	// Handle navigation link click with prevent default
	const handleNavLinkClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		id: string
	) => {
		e.preventDefault();
		smoothScrollTo(id);
	};

	useEffect(() => {
		// Check if we're on client-side
		if (typeof window !== 'undefined') {
			const checkIfMobile = () => {
				setIsMobile(window.innerWidth < 768);
			};

			// Initial check
			checkIfMobile();

			// Add event listener for window resize
			window.addEventListener('resize', checkIfMobile);

			// Cleanup
			return () => window.removeEventListener('resize', checkIfMobile);
		}
	}, []);

	// Logo source based on screen size
	const logoSrc = isMobile
		? '/taqueria_logo_bg_small.svg'
		: '/taqueria_logo_bg.svg';

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
			<div className="absolute inset-0 bg-black/50" />

			{/* Content */}
			<div className="relative h-full w-full flex flex-col justify-between md:justify-center px-4">
				{/* Upper content container for mobile layout */}
				<div className="flex flex-col items-center pt-6 md:pt-0 mt-0 md:mt-0">
					{/* Logo container with specific dimensions */}
					<div className="w-full max-w-4xl h-24 sm:h-32 md:h-40 lg:h-48 relative mb-0 sm:mb-4 md:mb-6 lg:mb-8 z-20">
						<SmoothScroll animation="fade" duration={1200}>
							<Image
								src="/taqueria_logo_white.svg"
								alt="Taqueria Logo"
								fill
								priority
								className="object-contain"
								style={{
									filter: 'drop-shadow(0 0 15px rgba(0,0,0,0.7))',
								}}
							/>
						</SmoothScroll>
					</div>

					{/* Background logo - static positioning instead of parallax */}
					<div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
						<div className="absolute top-[8%] md:top-[20%] left-0 w-full flex justify-center px-8 sm:px-12">
							<ParallaxScroll
								speed={1.2}
								direction="down"
								className="w-full max-w-[85%] sm:max-w-[90%] md:max-w-5xl h-64 relative"
							>
								<Image
									src={logoSrc}
									alt="Background Effect"
									fill
									priority
									className="object-contain"
									style={{
										opacity: 1,
										filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.3))',
									}}
								/>
							</ParallaxScroll>
						</div>
					</div>
				</div>

				{/* Middle content - tagline and button */}
				<div className="flex flex-col items-center z-20 mb-20 sm:mb-16 md:mb-8 lg:mb-0 mt-24 sm:mt-32 md:mt-36 lg:mt-40">
					<ParallaxScroll speed={0.8} direction="down" className="z-20">
						<p className="text-lg sm:text-xl md:text-2xl text-white text-center max-w-2xl font-medium relative z-20 mb-10 sm:mb-8 md:mb-10">
							{subtitle}
						</p>
					</ParallaxScroll>

					{/* Order Now Button */}
					<ParallaxScroll
						speed={0.6}
						direction="down"
						className="z-20 mt-8 sm:mt-10 md:mt-6 lg:mt-8"
					>
						<Link
							href="/menu"
							className="bg-white text-red-900 px-6 py-3 rounded-md font-bold 
							transition-colors hover:bg-transparent hover:text-white
							uppercase tracking-wide border border-white text-sm md:text-base inline-block"
							style={{ fontFamily: "'Courier New', monospace" }}
						>
							Order Now
						</Link>
					</ParallaxScroll>
				</div>

				{/* Contact information and social media */}
				<div className="w-full max-w-6xl flex flex-col md:flex-row justify-between gap-2 md:gap-0 px-4 mb-8 sm:mb-4 md:mb-16 md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2">
					{/* Contact information */}
					<ParallaxScroll
						speed={0.3}
						direction="down"
						className="flex items-center justify-between md:justify-start gap-1 md:gap-8 px-4 md:px-8 py-2 md:py-4 w-full md:w-auto"
					>
						{/* Location */}
						<div className="flex flex-col items-center w-[30%] md:w-24 px-1 md:px-0">
							<div className="bg-[#8B1A1A] rounded-full p-2 md:p-3 mb-1 shadow-md hover:bg-red-700 transition-colors cursor-pointer">
								<a
									href="https://maps.google.com/?q=123+Mihai+Eminescu"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Find us on Google Maps"
								>
									<svg
										className="w-5 h-5 md:w-6 md:h-6 text-white"
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
								</a>
							</div>
							<div className="text-center h-8 md:h-10 flex items-center">
								<p className="text-xs md:text-sm text-white font-semibold leading-tight">
									123 Mihai Eminescu
								</p>
							</div>
						</div>

						{/* Phone */}
						<div className="flex flex-col items-center w-[30%] md:w-24 px-1 md:px-0">
							<div className="bg-[#8B1A1A] rounded-full p-2 md:p-3 mb-1 shadow-md hover:bg-red-700 transition-colors cursor-pointer">
								<a href="tel:0314058226" aria-label="Call our restaurant">
									<svg
										className="w-5 h-5 md:w-6 md:h-6 text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
									</svg>
								</a>
							</div>
							<div className="text-center h-8 md:h-10 flex items-center">
								<p className="text-xs md:text-sm text-white font-semibold">
									0314058226
								</p>
							</div>
						</div>

						{/* Hours */}
						<div className="flex flex-col items-center w-[30%] md:w-24 px-1 md:px-0">
							<div className="bg-[#8B1A1A] rounded-full p-2 md:p-3 mb-1 shadow-md hover:bg-red-700 transition-colors cursor-pointer">
								<a
									href="#contact"
									aria-label="View our contact information"
									onClick={(e) => handleNavLinkClick(e, 'contact')}
								>
									<svg
										className="w-5 h-5 md:w-6 md:h-6 text-white"
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
								</a>
							</div>
							<div className="text-center h-8 md:h-10 flex items-center">
								<p className="text-xs md:text-sm text-white font-semibold">
									12:00 - 22:00
								</p>
							</div>
						</div>
					</ParallaxScroll>

					{/* Social media icons */}
					<ParallaxScroll
						speed={0.3}
						direction="down"
						className="flex items-center justify-between md:justify-start gap-1 md:gap-8 px-4 md:px-8 py-2 md:py-4 w-full md:w-auto"
					>
						{/* Facebook */}
						<div className="flex flex-col items-center w-[30%] md:w-24 px-1 md:px-0">
							<div className="bg-[#8B1A1A] rounded-full p-2 md:p-3 mb-1 shadow-md hover:bg-red-700 transition-colors cursor-pointer">
								<a
									href="https://www.facebook.com/taqueria.ro/"
									aria-label="Visit our Facebook page"
								>
									<svg
										className="w-5 h-5 md:w-6 md:h-6 text-white"
										fill="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z" />
									</svg>
								</a>
							</div>
							<div className="text-center h-8 md:h-10 flex items-center">
								<p className="text-xs md:text-sm text-white font-semibold">
									Facebook
								</p>
							</div>
						</div>
						{/* Twitter */}
						<div className="flex flex-col items-center w-[30%] md:w-24 px-1 md:px-0">
							<div className="bg-[#8B1A1A] rounded-full p-2 md:p-3 mb-1 shadow-md hover:bg-red-700 transition-colors cursor-pointer">
								<a
									href="https://x.com/Taqueria_Ro"
									aria-label="Visit our Twitter page"
								>
									<svg
										className="w-5 h-5 md:w-6 md:h-6 text-white"
										fill="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
									</svg>
								</a>
							</div>
							<div className="text-center h-8 md:h-10 flex items-center">
								<p className="text-xs md:text-sm text-white font-semibold">
									X/Twitter
								</p>
							</div>
						</div>
						{/* Instagram */}
						<div className="flex flex-col items-center w-[30%] md:w-24 px-1 md:px-0">
							<div className="bg-[#8B1A1A] rounded-full p-2 md:p-3 mb-1 shadow-md hover:bg-red-700 transition-colors cursor-pointer">
								<a
									href="https://www.instagram.com/taqueria.ro/"
									aria-label="Visit our Instagram page"
								>
									<svg
										className="w-5 h-5 md:w-6 md:h-6 text-white"
										fill="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M12.001 6.50195C8.96875 6.50195 6.50195 8.96875 6.50195 12.001C6.50195 15.0332 8.96875 17.5 12.001 17.5C15.0332 17.5 17.5 15.0332 17.5 12.001C17.5 8.96875 15.0332 6.50195 12.001 6.50195ZM12.001 15.459C10.1187 15.459 8.54297 13.8833 8.54297 12.001C8.54297 10.1187 10.1187 8.54297 12.001 8.54297C13.8833 8.54297 15.459 10.1187 15.459 12.001C15.459 13.8833 13.8833 15.459 12.001 15.459ZM18.6177 6.30079C18.6177 7.00391 18.0498 7.57178 17.3467 7.57178C16.6436 7.57178 16.0757 7.00391 16.0757 6.30079C16.0757 5.59766 16.6436 5.02979 17.3467 5.02979C18.0498 5.02979 18.6177 5.59766 18.6177 6.30079ZM21.9511 7.58936C21.8789 5.97852 21.4827 4.53126 20.292 3.3405C19.1013 2.14973 17.654 1.75355 16.0432 1.68139C14.376 1.59766 9.62598 1.59766 7.95876 1.68139C6.34792 1.75355 4.90066 2.14973 3.70989 3.3405C2.51911 4.53126 2.12293 5.97852 2.05077 7.58936C1.96704 9.25659 1.96704 14.0066 2.05077 15.6738C2.12293 17.2847 2.51911 18.7319 3.70989 19.9227C4.90066 21.1135 6.34792 21.5096 7.95876 21.5818C9.62598 21.6655 14.376 21.6655 16.0432 21.5818C17.654 21.5096 19.1013 21.1135 20.292 19.9227C21.4827 18.7319 21.8789 17.2847 21.9511 15.6738C22.0348 14.0066 22.0348 9.25659 21.9511 7.58936ZM19.6514 17.4541C19.2744 18.3745 18.5538 19.0951 17.6334 19.4721C16.2354 20.0225 13.1006 19.9023 12.001 19.9023C10.9014 19.9023 7.76661 20.0225 6.36864 19.4721C5.44825 19.0951 4.72766 18.3745 4.35059 17.4541C3.80019 16.0562 3.92043 12.9214 3.92043 12.001C3.92043 11.0806 3.80019 7.94575 4.35059 6.54778C4.72766 5.62739 5.44825 4.9068 6.36864 4.52973C7.76661 3.97934 10.9014 4.09958 12.001 4.09958C13.1006 4.09958 16.2354 3.97934 17.6334 4.52973C18.5538 4.9068 19.2744 5.62739 19.6514 6.54778C20.2018 7.94575 20.0816 11.0806 20.0816 12.001C20.0816 12.9214 20.2018 16.0562 19.6514 17.4541Z" />
									</svg>
								</a>
							</div>
							<div className="text-center h-8 md:h-10 flex items-center">
								<p className="text-xs md:text-sm text-white font-semibold">
									Instagram
								</p>
							</div>
						</div>
					</ParallaxScroll>
				</div>

				{/* Scroll indicator */}
				<SmoothScroll
					animation="fade"
					delay={1500}
					duration={1000}
					once={false}
					className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block"
				>
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
				</SmoothScroll>
			</div>
		</div>
	);
};

export default Hero;
