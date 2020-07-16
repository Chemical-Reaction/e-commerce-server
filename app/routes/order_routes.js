// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for user
const User = require('./../models/user')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404

// this is middleware that will remove blank fields from `req.body`, e.g.
// { order: { title: '', text: 'foo' } } -> { order: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /orders
router.get('/orders', requireToken, (req, res, next) => {
  User.findById(req.user._id)
    .populate('orders.products')
    .then(user => {
      // `user` will be the user that made the request
      // we want to convert each order to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      const orders = user.orders
      return orders.map(order => order.toObject())
    })
    // respond with status 200 and JSON of the orders
    .then(orders => res.status(200).json({ orders: orders }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /orders
router.post('/orders', requireToken, (req, res, next) => {
  User.findById(req.user._id)
    .then(user => {
      user.orders.push({date: new Date(), active: true})
      console.log('user before we save it', user)
      return user.save()
    })
  // respond to succesful `create` with status 201 and JSON of all orders for that user
    .then(user => res.status(201).json({orders: user.orders}))
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /orders/5a7db6c74d55bc51bdf39793
router.patch('/orders/:id', requireToken, removeBlanks, (req, res, next) => {
  User.findById(req.user._id)
    .then(handle404)
    .then(user => {
      const order = user.orders.id(req.params.id)
      // pass the result of Mongoose's `.update` to the next `.then`
      order.set(req.body.order)
      return user.save()
    })
    // if that succeeded, return 201 and user's orders
    .then(user => res.status(201).json({orders: user.orders}))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
