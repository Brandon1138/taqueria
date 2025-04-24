import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<title>Taqueria - Authentic Street Food Experience</title>
				<meta
					name="description"
					content="Discover our authentic Mexican street food at Taqueria. Enjoy delicious tacos, burritos, and more made with fresh ingredients and traditional recipes."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
