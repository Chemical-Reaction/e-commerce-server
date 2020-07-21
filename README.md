
# Petsy E-Commerce Store Client Application

  Our e-commerce store Petsy is a client application where users can browse pet products, add items to their cart, and submit an order by using the Stripe payment system at checkout.

# Planning
First, we worked on the user stories and what we wanted our users to experience while using our application. Then, we worked on our wireframes for our e-commerce store to get an idea of what we wanted our application to look like. Next, we created our Entity Relationship Diagram (ERD) in which mapped out our models, which includes user, purchases, and products. We used pair programming and mob programming during creating this application and were able to problem solve successfully due to collaboration on different elements of our project.

# User stories
  1. User is able to view products without being signed in.
  2. In order to place an item in cart, the customer will need to create an account.
  3. The customer will create an account by signing up and signing in.
  4. User will be able to change the password after signing in and have the option of signing out.
  5. User will be able to add items to cart from product list.
  6. User will be able to delete items from cart.
  7. User will be able to checkout cart with stipe pay and the order will be archived to their order history.


# Technologies Used:
  - Express.js
  - Node.js
  - Axios
  - MongoDB
  - Mongoose

# Links
  ### Front-End Repository
  <https://github.com/Chemical-Reaction/e-commerce-client>
  ### Deployed Client Site
  <https://chemical-reaction.github.io/e-commerce-client/>
  ### Deployed API
  <https://lit-reef-17341.herokuapp.com>

## ERD

![ERD](https://i.imgur.com/iExXjKp.png)

## API End Points
| Verb   | URI Pattern               | Controller#Action |
|--------|---------------------------|-------------------|
| POST   | `/sign-up`                | `users#signup`    |
| POST   | `/sign-in`                | `users#signin`    |
| DELETE | `/sign-out`               | `users#signout`   |
| PATCH  | `/change-password`        | `users#changepw`  |
| GET    | `/products`               | `products#index`  |
| GET    | `/orders`                 | `orders#index`    |
| POST   | `/orders`                 | `orders#create`   |
| PATCH  | `/orders`                 | `orders#update`   |

### signup
The `create` action expects a *POST* of `credentials` identifying a new user to create, e.g.:
```json
{
  "credentials": {
    "email": "an@example.email",
    "password": "an example password",
    "password_confirmation": "an example password"
  }
}
```
If the request is successful, the response will have an HTTP Status of 201,
Created, and the body will be JSON containing the `id` and `email` of the new
user, e.g.:
```json
{
  "user": {
    "_id":"an example id",
    "email":"an@example.com",
    "orders":[],
    "createdAt":"an example date",
    "updatedAt":"an example date",
    "__v":0
  }
}
```
If the request is unsuccessful, the response will have an HTTP Status of 400 Bad
Request, and the response body will be empty.
### signin
The `signin` action expects a *POST* with `credentials` identifying a previously registered user, e.g.:
```json
{
  "credentials": {
    "email": "an@example.email",
    "password": "an example password"
  }
}
```
If the request is successful, the response will have an HTTP Status of 200 OK,
and the body will be JSON containing the user's `id`, `email`, and the `token`
used to authenticate other requests, e.g.:
```json
{
  "user":{
    "_id":"an example id",
    "email":"an@example.com",
    "orders":[],
    "createdAt":"an example date",
    "updatedAt":"an example date",
    "__v":0,
    "token":"<token>"
  }
}
```
If the request is unsuccessful, the response will have an HTTP Status of 401
Unauthorized, and the response body will include the error.
### signout
The `signout` action expects a *DELETE* request and must include the user's
token, but no data is necessary to be sent.
If the request is successful the response will have an HTTP status of 204 No
Content.
If the request is unsuccessful, the response will have a status of 401
Unauthorized.
### changepw
The `changepw` action expects a PATCH of `passwords` specifying the `old` and `new`, eg.:
```json
{
  "passwords": {
    "old": "example password",
    "new": "new example password"
  }
}
```
If the request is successful the response will have an HTTP status of 204 No
Content.
If the request is unsuccessful the response will have an HTTP status of 400 Bad Request.

The `sign-out` and `change-password` requests must include a valid HTTP header
`Authorization: Token token=<token>` or they will be rejected with a status of
401 Unauthorized.

## Products
### index
The `index` action is a _GET_ that retrieves all of the products in that are currently stored on the database. The response status will be 200 OK, and the response body will contain JSON containing an array of products, e.g.:
```
{
    "products": [
        {
            "_id": "an example product id",
            "name": "toothbrush",
            "description": "for your daily dental hygiene",
            "price": 5,
            "createdAt": "an example date",
            "updatedAt": "an example date",
            "__v": 0
        },
        {
            "_id": "another example product id",
            "name": "tent",
            "description": "great for camping",
            "price": 75,
            "createdAt": "an example date",
            "updatedAt": "an example date",
            "__v": 0
        }
    ]
}
```
If the request is unsuccessful, the response will have an HTTP Status of 500 Internal Server Error, and the response body will be JSON describing the errors.

## Orders
### index
The `index` action is a _GET_ that retrieves all the orders associated with a user. The response status will be 200 OK and the response body will contain JSON containing an array of orders, e.g:
```
{
  "orders": [
    {
      "products": [
        {
          "_id": "an example id",
          "name": "Product",
          "description": "Description",
          "price": 123,
          "image": "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          "createdAt": "2020-07-19T19:50:49.428Z",
          "updatedAt": "2020-07-19T19:50:49.428Z",
          "__v": 0
        }
      ],
      "_id": "an example id",
      "date": "Mon Jul 20 2020 20:07:58 GMT-0400 (Eastern Daylight Time)",
      "active": false,
      "createdAt": "2020-07-21T00:07:58.479Z",
      "updatedAt": "2020-07-21T00:08:17.881Z"
    },
    {
      "products": [
        {
          "_id": "an example id",
          "name": "My product 1",
          "description": "Description",
          "price": 123,
          "image": "exampleimage",
          "createdAt": "2020-07-19T19:50:49.428Z",
          "updatedAt": "2020-07-19T19:50:49.428Z",
          "__v": 0
        }
      ],
      "_id": "an example id",
      "date": "Mon Jul 20 2020 20:08:17 GMT-0400 (Eastern Daylight Time)",
      "active": true,
      "createdAt": "2020-07-21T00:08:17.958Z",
      "updatedAt": "2020-07-21T00:08:23.090Z"
    }
  ]
}
```
If the request is unsuccessful, the response will have an HTTP Status of 400 Bad Request, and the response body will be JSON describing the errors.

### create

The `create` action expects a POST with a token of the user. If the request is successful, the response will have an HTTP Status of 201 Created, and the body will contain JSON of the created order. The order will be empty at first (no products) with `active` set to `true` e.g.:
```
{
	"orders": [
		{
		"products": [],"
		_id":"an example id",
		"date":"Mon Jul 20 2020 20:19:47 GMT-0400 (Eastern Daylight Time)",
		"active":true,
		"createdAt":"2020-07-21T00:19:47.039Z",
		"updatedAt":"2020-07-21T00:19:47.039Z"
		}
	]
}
```
### update

This `update` expects a PATCH request with changes to an existing order, with a body formatted as such:
```
{
  "order": {
    "active": "false"
  }
}
```
If the request is successful, the response will have an HTTP Status of 201 Created, and the body will contain JSON of the updated order.
```
{
  "orders": [
    {
      "products": [
        "an example product id",
        "another example product id"
      ],
      "_id": "an example order id",
      "date": "Mon Jul 20 2020 20:30:32 GMT-0400 (GMT-04:00)",
      "active": false,
      "createdAt": "2020-07-21T00:30:32.527Z",
      "updatedAt": "2020-07-21T00:31:11.421Z"
    }
  ]
}
```

If the request is unseccussful, the response will have an HTTP Status of 400 Bad Request, and the body will be JSON describing the errors.

# Future Developement Plans

  - Allow users to add reviews for products.
  - Allow users to add quantity to products they would like to add to cart.
  - Allow users to search for products by name.
