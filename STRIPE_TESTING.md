# Testing Stripe Integration

This guide provides instructions on how to test the Stripe payment integration in your application.

## Prerequisites

1. Make sure your `.env.local` file contains these variables:

   ```
   STRIPE_SECRET_KEY=your_test_secret_key
   STRIPE_PUBLISHABLE_KEY=your_test_publishable_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   ```

2. Ensure your products are set up in the Stripe dashboard.

## Test Cards

Use these test card numbers to simulate different payment scenarios:

- **Successful payment**: 4242 4242 4242 4242
- **Payment requires authentication**: 4000 0025 0000 3155
- **Payment declined (generic)**: 4000 0000 0000 0002
- **Payment declined (insufficient funds)**: 4000 0000 0000 9995

For all test cards:

- Use any future date for expiration (e.g., 12/34)
- Use any 3-digit CVC
- Use any name and address

## Testing the Checkout Flow

1. Add items to your cart
2. Proceed to checkout
3. Complete the Stripe checkout form using a test card
4. Observe the payment result

### Successful Payment Flow

1. Add items to cart
2. Go to checkout
3. Use card number: 4242 4242 4242 4242
4. Complete the purchase
5. You should be redirected to the "Thank You" page

### Failed Payment Flow

1. Add items to cart
2. Go to checkout
3. Use card number: 4000 0000 0000 0002
4. Complete the purchase
5. You should see an error message and be redirected to the payment failure page

## Testing Webhooks Locally

To test webhooks locally, you need to use the Stripe CLI:

1. Install the Stripe CLI from [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Login to your Stripe account: `stripe login`
3. Start forwarding events to your local server:
   ```
   stripe listen --forward-to http://localhost:3000/api/webhooks
   ```
4. Note the webhook signing secret that is displayed and add it to your `.env.local` file as `STRIPE_WEBHOOK_SECRET`

## Order Management

After a successful payment:

1. The webhook handler will process the `checkout.session.completed` event
2. Check the server logs for confirmation

## Troubleshooting

### Common Issues

- **Payment not processing**: Check if your Stripe API keys are correct
- **Webhook events not being received**: Ensure the Stripe CLI is properly configured and running
- **Redirect issues**: Check that the success and cancel URLs are properly set up

If you encounter any issues, check the server logs for more detailed error messages.

## Going to Production

When ready for production:

1. Replace test API keys with live API keys
2. Update webhook endpoints in the Stripe dashboard
3. Set up proper error handling and logging for production
