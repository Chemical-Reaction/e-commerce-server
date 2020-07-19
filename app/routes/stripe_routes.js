const express = require('express')
const stripe = require('stripe')('sk_test_51H66m5Bl2OnK3EGGHCefnNeBHbGThYVyZcGx32sVYMKX4UlVZAFn0m39m2iCvNZFEcAmjYFlbZmoATTR1MF8xWwf00H0eynrM5')

const router = express.Router()

router.post('/create-payment-intent', async (req, res) => {
  const amount = req.body.amount
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'usd'
  })
  res.json({
    clientSecret: paymentIntent.client_secret
  })
})

module.exports = router
