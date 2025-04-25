import SupabaseProductList from '../../components/SupabaseProductList';

export default function SupabaseProductsPage() {
	return (
		<main className="min-h-screen p-4">
			<h1 className="text-3xl font-bold mb-6 text-center">Taqueria Menu</h1>
			<SupabaseProductList />
		</main>
	);
}
