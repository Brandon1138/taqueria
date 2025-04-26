import React, { ReactNode, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CartWidget from './CartWidget';
import CartModal from './CartModal';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
	children: ReactNode;
	fullWidth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, fullWidth = false }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isCartModalOpen, setIsCartModalOpen] = useState(false);
	const [language, setLanguage] = useState('en');
	const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const toggleCartModal = () => {
		setIsCartModalOpen(!isCartModalOpen);
	};

	const toggleLanguageDropdown = () => {
		setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
	};

	const changeLanguage = (lang: string) => {
		setLanguage(lang);
		setIsLanguageDropdownOpen(false);
	};

	// Improved smooth scroll implementation with useCallback
	const smoothScrollTo = useCallback((id: string) => {
		setIsMenuOpen(false);

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

	// Check for hash in URL on initial load to smooth scroll
	useEffect(() => {
		// Handle hash in URL for direct navigation
		if (typeof window !== 'undefined') {
			const hash = window.location.hash;
			if (hash) {
				// Remove the # symbol
				const id = hash.substring(1);

				// Small delay to ensure all components are rendered
				setTimeout(() => {
					smoothScrollTo(id);
				}, 500);
			}
		}
	}, [smoothScrollTo]);

	// Handle navigation link click with prevent default
	const handleNavLinkClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		id: string
	) => {
		e.preventDefault();
		smoothScrollTo(id);
	};

	return (
		<div className="min-h-screen flex flex-col bg-neutral-900">
			<header className="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-sm text-white z-40">
				<div className="container mx-auto px-6 flex justify-between items-center h-16">
					<Link href="/" className="flex items-center">
						<Image
							src="/taqueria_logo_white.svg"
							alt="Taqueria Logo"
							width={120}
							height={30}
							priority
						/>
					</Link>

					{/* Main Navigation - Order Now CTA and Cart Widget */}
					<div className="flex items-center space-x-4">
						{/* Language Selector */}
						<div className="relative">
							<button
								onClick={toggleLanguageDropdown}
								className="flex items-center space-x-1 focus:outline-none"
								aria-label="Select language"
								aria-expanded={isLanguageDropdownOpen}
							>
								<Image
									src={`/flags/${language}.svg`}
									alt={language === 'en' ? 'English' : 'Romanian'}
									width={20}
									height={15}
									className="rounded-sm"
								/>
								<svg
									className="h-4 w-4 text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d={
											isLanguageDropdownOpen
												? 'M5 15l7-7 7 7'
												: 'M19 9l-7 7-7-7'
										}
									/>
								</svg>
							</button>

							{/* Language Dropdown */}
							{isLanguageDropdownOpen && (
								<div className="absolute right-0 mt-2 w-32 bg-neutral-800 rounded-md shadow-lg overflow-hidden z-50">
									<div className="py-1">
										<button
											onClick={() => changeLanguage('en')}
											className={`flex items-center w-full px-4 py-2 text-sm text-white hover:bg-neutral-700 ${
												language === 'en' ? 'bg-neutral-700' : ''
											}`}
										>
											<Image
												src="/flags/en.svg"
												alt="English"
												width={20}
												height={15}
												className="rounded-sm mr-2"
											/>
											English
										</button>
										<button
											onClick={() => changeLanguage('ro')}
											className={`flex items-center w-full px-4 py-2 text-sm text-white hover:bg-neutral-700 ${
												language === 'ro' ? 'bg-neutral-700' : ''
											}`}
										>
											<Image
												src="/flags/ro.svg"
												alt="Romanian"
												width={20}
												height={15}
												className="rounded-sm mr-2"
											/>
											Română
										</button>
									</div>
								</div>
							)}
						</div>

						{/* Hamburger Menu Button (now for all screen sizes) */}
						<button
							onClick={toggleMenu}
							className="p-2 focus:outline-none"
							aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
							aria-expanded={isMenuOpen}
						>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								{isMenuOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								)}
							</svg>
						</button>

						<CartWidget onCartClick={toggleCartModal} />
					</div>
				</div>
			</header>

			{/* Hamburger Menu - moved outside header for proper display */}
			<AnimatePresence>
				{isMenuOpen && (
					<>
						<motion.div
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
							className="fixed top-0 right-0 h-full w-80 md:w-96 bg-neutral-900 bg-opacity-80 backdrop-blur-md shadow-lg z-50"
							style={{ maxHeight: '100vh', overflowY: 'auto' }}
						>
							<div className="px-6 py-6 space-y-6">
								{/* Close button */}
								<div className="flex justify-end">
									<button
										onClick={toggleMenu}
										className="text-white focus:outline-none"
										aria-label="Close menu"
									>
										<svg
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
									</button>
								</div>

								{/* Menu logo */}
								<div className="flex justify-center mb-6">
									<Image
										src="/taqueria_logo_white.svg"
										alt="Taqueria Logo"
										width={120}
										height={30}
										priority
									/>
								</div>

								{/* Navigation Links - Reordered */}
								<nav className="space-y-4">
									<a
										href="/"
										className="block py-2 text-base font-medium text-white hover:text-red-200 border-b border-neutral-800 pb-2"
										onClick={(e) => handleNavLinkClick(e, 'home')}
									>
										Home
									</a>
									<a
										href="/#featured"
										className="block py-2 text-base font-medium text-white hover:text-red-200 border-b border-neutral-800 pb-2"
										onClick={(e) => handleNavLinkClick(e, 'featured')}
									>
										Featured Items
									</a>
									<a
										href="/#dishes"
										className="block py-2 text-base font-medium text-white hover:text-red-200 border-b border-neutral-800 pb-2"
										onClick={(e) => handleNavLinkClick(e, 'dishes')}
									>
										Dishes
									</a>
									<a
										href="/#app"
										className="block py-2 text-base font-medium text-white hover:text-red-200 border-b border-neutral-800 pb-2"
										onClick={(e) => handleNavLinkClick(e, 'app')}
									>
										Mobile App
									</a>
									<a
										href="/#happy-hour"
										className="block py-2 text-base font-medium text-white hover:text-red-200 border-b border-neutral-800 pb-2"
										onClick={(e) => handleNavLinkClick(e, 'happy-hour')}
									>
										Happy Hour
									</a>
									<a
										href="/#contact"
										className="block py-2 text-base font-medium text-white hover:text-red-200 border-b border-neutral-800 pb-2"
										onClick={(e) => handleNavLinkClick(e, 'contact')}
									>
										Contact
									</a>
								</nav>

								{/* Menu button added between Contact and social media section */}
								<div className="mt-6 pt-6 border-t border-neutral-800">
									<Link
										href="/menu"
										className="block w-full text-center py-3 rounded-md text-base font-medium bg-white text-red-900 hover:bg-transparent hover:text-white transition-colors border border-white"
										onClick={() => setIsMenuOpen(false)}
									>
										Menu
									</Link>
								</div>

								{/* Social media links */}
								<div className="mt-6 pt-6 border-t border-neutral-800">
									<p className="text-white text-sm mb-4">Follow us:</p>
									<div className="flex space-x-4 justify-center">
										<a
											href="https://www.facebook.com/taqueria.ro/"
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Visit our Facebook page"
											className="text-white hover:text-red-200"
										>
											<svg
												className="w-6 h-6"
												fill="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z" />
											</svg>
										</a>
										<a
											href="https://x.com/Taqueria_Ro"
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Visit our Twitter page"
											className="text-white hover:text-red-200"
										>
											<svg
												className="w-6 h-6"
												fill="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
											</svg>
										</a>
										<a
											href="https://www.instagram.com/taqueria.ro/"
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Visit our Instagram page"
											className="text-white hover:text-red-200"
										>
											<svg
												className="w-6 h-6"
												fill="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M12.001 6.50195C8.96875 6.50195 6.50195 8.96875 6.50195 12.001C6.50195 15.0332 8.96875 17.5 12.001 17.5C15.0332 17.5 17.5 15.0332 17.5 12.001C17.5 8.96875 15.0332 6.50195 12.001 6.50195ZM12.001 15.459C10.1187 15.459 8.54297 13.8833 8.54297 12.001C8.54297 10.1187 10.1187 8.54297 12.001 8.54297C13.8833 8.54297 15.459 10.1187 15.459 12.001C15.459 13.8833 13.8833 15.459 12.001 15.459ZM18.6177 6.30079C18.6177 7.00391 18.0498 7.57178 17.3467 7.57178C16.6436 7.57178 16.0757 7.00391 16.0757 6.30079C16.0757 5.59766 16.6436 5.02979 17.3467 5.02979C18.0498 5.02979 18.6177 5.59766 18.6177 6.30079ZM21.9511 7.58936C21.8789 5.97852 21.4827 4.53126 20.292 3.3405C19.1013 2.14973 17.654 1.75355 16.0432 1.68139C14.376 1.59766 9.62598 1.59766 7.95876 1.68139C6.34792 1.75355 4.90066 2.14973 3.70989 3.3405C2.51911 4.53126 2.12293 5.97852 2.05077 7.58936C1.96704 9.25659 1.96704 14.0066 2.05077 15.6738C2.12293 17.2847 2.51911 18.7319 3.70989 19.9227C4.90066 21.1135 6.34792 21.5096 7.95876 21.5818C9.62598 21.6655 14.376 21.6655 16.0432 21.5818C17.654 21.5096 19.1013 21.1135 20.292 19.9227C21.4827 18.7319 21.8789 17.2847 21.9511 15.6738C22.0348 14.0066 22.0348 9.25659 21.9511 7.58936ZM19.6514 17.4541C19.2744 18.3745 18.5538 19.0951 17.6334 19.4721C16.2354 20.0225 13.1006 19.9023 12.001 19.9023C10.9014 19.9023 7.76661 20.0225 6.36864 19.4721C5.44825 19.0951 4.72766 18.3745 4.35059 17.4541C3.80019 16.0562 3.92043 12.9214 3.92043 12.001C3.92043 11.0806 3.80019 7.94575 4.35059 6.54778C4.72766 5.62739 5.44825 4.9068 6.36864 4.52973C7.76661 3.97934 10.9014 4.09958 12.001 4.09958C13.1006 4.09958 16.2354 3.97934 17.6334 4.52973C18.5538 4.9068 19.2744 5.62739 19.6514 6.54778C20.2018 7.94575 20.0816 11.0806 20.0816 12.001C20.0816 12.9214 20.2018 16.0562 19.6514 17.4541Z" />
											</svg>
										</a>
									</div>
								</div>
							</div>
						</motion.div>

						{/* Overlay when menu is open */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 bg-black bg-opacity-50 z-40"
							onClick={toggleMenu}
							aria-hidden="true"
						></motion.div>
					</>
				)}
			</AnimatePresence>

			{/* Cart Modal - moved outside header for proper display */}
			<CartModal
				isOpen={isCartModalOpen}
				onClose={() => setIsCartModalOpen(false)}
			/>

			<main
				className={`flex-grow pt-16 w-full ${
					fullWidth ? '' : 'container mx-auto px-6'
				}`}
				style={{
					backgroundImage:
						"url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
					backgroundAttachment: 'fixed',
				}}
			>
				{children}
			</main>
			<footer className="bg-neutral-900 text-white py-8">
				<div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
					<div className="flex justify-center md:justify-start">
						<Image
							src="/taqueria_logo_white.svg"
							alt="Taqueria Logo"
							width={150}
							height={70}
							priority
						/>
					</div>

					<div className="text-center md:text-left">
						<p className="mb-2">123 Mihai Eminescu, Bucharest</p>
						<p className="mb-2">Phone: 0314058226</p>
						<p>E-mail: invoices@taqueria.ro</p>
					</div>

					<div className="flex flex-col items-center md:items-end">
						<div className="mb-4">
							<p className="mb-2">Follow us on:</p>
							<div className="flex justify-between" style={{ width: '188px' }}>
								<a
									href="https://www.facebook.com/taqueria.ro/"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Visit our Facebook page"
									className="bg-[#8B1A1A] rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 transition-colors shadow-md"
								>
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z" />
									</svg>
								</a>
								<a
									href="https://x.com/Taqueria_Ro"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Visit our Twitter page"
									className="bg-[#8B1A1A] rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 transition-colors shadow-md"
								>
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
									</svg>
								</a>
								<a
									href="https://www.instagram.com/taqueria.ro/"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Visit our Instagram page"
									className="bg-[#8B1A1A] rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 transition-colors shadow-md"
								>
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M12.001 6.50195C8.96875 6.50195 6.50195 8.96875 6.50195 12.001C6.50195 15.0332 8.96875 17.5 12.001 17.5C15.0332 17.5 17.5 15.0332 17.5 12.001C17.5 8.96875 15.0332 6.50195 12.001 6.50195ZM12.001 15.459C10.1187 15.459 8.54297 13.8833 8.54297 12.001C8.54297 10.1187 10.1187 8.54297 12.001 8.54297C13.8833 8.54297 15.459 10.1187 15.459 12.001C15.459 13.8833 13.8833 15.459 12.001 15.459ZM18.6177 6.30079C18.6177 7.00391 18.0498 7.57178 17.3467 7.57178C16.6436 7.57178 16.0757 7.00391 16.0757 6.30079C16.0757 5.59766 16.6436 5.02979 17.3467 5.02979C18.0498 5.02979 18.6177 5.59766 18.6177 6.30079ZM21.9511 7.58936C21.8789 5.97852 21.4827 4.53126 20.292 3.3405C19.1013 2.14973 17.654 1.75355 16.0432 1.68139C14.376 1.59766 9.62598 1.59766 7.95876 1.68139C6.34792 1.75355 4.90066 2.14973 3.70989 3.3405C2.51911 4.53126 2.12293 5.97852 2.05077 7.58936C1.96704 9.25659 1.96704 14.0066 2.05077 15.6738C2.12293 17.2847 2.51911 18.7319 3.70989 19.9227C4.90066 21.1135 6.34792 21.5096 7.95876 21.5818C9.62598 21.6655 14.376 21.6655 16.0432 21.5818C17.654 21.5096 19.1013 21.1135 20.292 19.9227C21.4827 18.7319 21.8789 17.2847 21.9511 15.6738C22.0348 14.0066 22.0348 9.25659 21.9511 7.58936ZM19.6514 17.4541C19.2744 18.3745 18.5538 19.0951 17.6334 19.4721C16.2354 20.0225 13.1006 19.9023 12.001 19.9023C10.9014 19.9023 7.76661 20.0225 6.36864 19.4721C5.44825 19.0951 4.72766 18.3745 4.35059 17.4541C3.80019 16.0562 3.92043 12.9214 3.92043 12.001C3.92043 11.0806 3.80019 7.94575 4.35059 6.54778C4.72766 5.62739 5.44825 4.9068 6.36864 4.52973C7.76661 3.97934 10.9014 4.09958 12.001 4.09958C13.1006 4.09958 16.2354 3.97934 17.6334 4.52973C18.5538 4.9068 19.2744 5.62739 19.6514 6.54778C20.2018 7.94575 20.0816 11.0806 20.0816 12.001C20.0816 12.9214 20.2018 16.0562 19.6514 17.4541Z" />
									</svg>
								</a>
							</div>
						</div>
						<Link
							href="/menu"
							className="bg-red-800 text-white px-8 py-2 rounded hover:bg-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none transition-colors transform hover:-translate-y-0.5 shadow-md border border-red-700 uppercase tracking-wide text-center inline-block"
							style={{ fontFamily: "'Courier New', monospace" }}
						>
							Order online
						</Link>
					</div>
				</div>
				<div className="container mx-auto mt-8 pt-4 border-t border-neutral-800 text-center text-neutral-400">
					<p>© {new Date().getFullYear()} Taqueria. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
};

export default Layout;
