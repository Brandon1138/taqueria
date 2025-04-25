import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import { Product } from '../domain/models/Product';
import FeaturedItems from '../components/home/FeaturedItems';
import DishesSection from '../components/home/DishesSection';
import MobileAppSection from '../components/home/MobileAppSection';
import HappyHourSection from '../components/home/HappyHourSection';
import ContactSection from '../components/home/ContactSection';

interface HomeProps {
	featuredProducts: Product[];
}

export const getStaticProps: GetStaticProps = async () => {
	// In a real application, you would fetch this from an API or database
	const menuData = require('../infrastructure/data/menu.json');

	// Include all products as featured (total of 6)
	const featuredProductIds = ['1', '2', '3', '4', '5', '6']; // All 6 products
	const featuredProducts = menuData.products.filter((product: Product) =>
		featuredProductIds.includes(product.id)
	);

	return {
		props: {
			featuredProducts,
		},
	};
};

// Component for displaying a product tag with stamp-like appearance
const TagStamp: React.FC<{ label: string }> = ({ label }) => {
	// Define color classes based on tag name
	let stampStyles = '';

	switch (label) {
		case 'New':
			stampStyles = 'bg-green-600 rotate-3';
			break;
		case 'Chef Recommends':
			stampStyles = 'bg-blue-600 -rotate-2';
			break;
		case 'Special Offer':
			stampStyles = 'bg-red-600 rotate-1';
			break;
		default:
			stampStyles = 'bg-red-900 -rotate-1';
	}

	return (
		<span
			className={`inline-block ${stampStyles} text-white text-xs font-bold mr-2 px-3 py-1 rounded transform 
			shadow-sm border border-opacity-20 border-black uppercase tracking-wider`}
			style={{ fontFamily: "'Courier New', monospace" }}
		>
			{label}
		</span>
	);
};

// Component for a pill-shaped button with street food aesthetic
const StampButton: React.FC<{
	onClick: () => void;
	children: React.ReactNode;
}> = ({ onClick, children }) => (
	<button
		onClick={onClick}
		className="bg-red-900 text-white px-6 py-2 rounded-md font-bold 
		hover:bg-red-800 focus:ring-2 focus:ring-red-700 focus:outline-none 
		transition-colors transform hover:-translate-y-0.5 shadow-md border border-red-800
		uppercase tracking-wide"
		style={{ fontFamily: "'Courier New', monospace" }}
	>
		{children}
	</button>
);

const Home: React.FC<HomeProps> = ({ featuredProducts }) => {
	// Google Maps embed ID
	const mapEmbedId = 'b921238f4c767f7';

	return (
		<Layout fullWidth={true}>
			<Head>
				<title>Taqueria - Authentic Mexican Street Food</title>
			</Head>
			{/* Hero Section */}
			<Hero />

			{/* Main Content */}
			<div className="w-full bg-neutral-900">
				<div className="w-full max-w-6xl px-4 mx-auto">
					{/* Featured Items Section */}
					<FeaturedItems featuredProducts={featuredProducts} />

					{/* See our Dishes Section */}
					<DishesSection />

					{/* Mobile App Download Section */}
					<MobileAppSection />

					{/* Happy Hour Promotion Section */}
					<HappyHourSection />
				</div>
			</div>

			{/* Contact Section with Map */}
			<ContactSection mapEmbedId={mapEmbedId} />
		</Layout>
	);
};

export default Home;
