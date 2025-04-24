export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	category: string;
	tags?: string[]; // Optional array of tag strings like "New", "Chef Recommends", etc.
}
