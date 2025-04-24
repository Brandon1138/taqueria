# Taqueria

A modern web application for a Mexican food restaurant, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Browse menu items by category
- Add items to shopping cart
- Manage cart (update quantities, remove items)
- Secure checkout with Stripe
- Responsive design for mobile and desktop

## Architecture

This project follows Clean Architecture principles:

- **Domain Layer**: Core business logic and entities
- **Application Layer**: Use cases that orchestrate business rules
- **Infrastructure Layer**: External systems like payment gateways and data sources
- **Presentation Layer**: Next.js pages and React components

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

   - Create a `.env.local` file based on `.env.example`
   - Add your Stripe secret key

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Folder Structure

```
taqueria/
├── domain/            # Core business logic and entities
├── application/       # Use cases
├── infrastructure/    # External services
├── pages/             # Next.js pages and API routes
├── components/        # Reusable React components
├── lib/               # Utility functions and context providers
├── public/            # Static assets
└── styles/            # Global styles
```

## Technologies

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/) for payment processing

## License

MIT
