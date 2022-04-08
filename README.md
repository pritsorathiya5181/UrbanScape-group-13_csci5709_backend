# Project: UrbanScape

- _Date Created_: 27 Feb 2022
- _Last Modification Date_: 29 March 2022
- _Heroku deployed URL_: <https://g13-urbanscape-backend.herokuapp.com/>
- _Group repository Backend git URL_: <https://git.cs.dal.ca/psorathiya/group-13_csci5709_backend>

## Authors

- [Aeshna Verma] - _(B00880776)_
- [Janhavi Sonawane] - _(B00881787)_
- [Manjinder Singh] - _(B00866348)_
- [Prit Ajaykumar Sorathiya] - _(B00890175)_
- [Priti Sri Pandey] - _(B00877337)_
- [Rikin Pineshkumar Patel] - _(B00864960)_

## APIs:

1. /api/services/addService - this is a POST API, used to add a new service
2. /api/services/services - this is a GET API, used to get all the services
3. /api/services/services/:professionalId - this is a GET API, used tp get all the services of the specific professional
4. /api/services/:serviceId - this is a GET API, used to get all the details about the specific service
5. /api/services/:serviceId - this is a PUT API, used to update the specific services
6. /api/services/:serviceId - this is a DELETE API, used to delete the specific services
7. /api/services/stats/:professionalId - this is a GET API, used to get all the service stats of the specific professional.
8. /api/order/approve/:orderId - this is a POST API, used to approve sercie request.
9. /api/order/cancel/:orderId - this is a POST API, used to reject sercie request that has been made by the customer.
10. /api/services - this is a GET API, used to get all services that are offered through the website
11. /api/subscribe - this is a POST API, used to save the email address provided by the user to subscribe to newsletter
12. /api/cart/:user - this is a GET API, used to get all the cart items for a user
13. /api/cart/:user - this is a POST API, used to save the item to the cart
14. /api/cart/:user - this is a DELETE API, used to remove an item from the cart for a user
15. /api/cart/:user - this is a PUT API, used to create an empty cart when a customer is signed up
16. /api/cart/ - this is a DELETE API, used to empty the cart after order is placed
17. /api/order/payment/:user - this is a POST API, used to save the order details once payment is successful

## Team Work

### Feature (User Authentication)
#### Author - Janhavi Sonawane
```
- index.js
- routes/customer/auth.js
- models/user/User.js
- controllers/auth.js

```

### Feature (Website Offered Service Management)
#### Author - Priti Sri Pandey
```
- routes/services.js
- models/ServiceCategories.js
- controllers/services.js

```

### Feature (Newsletter Subscription)
#### Author - Priti Sri Pandey
```
- routes/customer/newsletterSubscription.js
- models/newsletterSubscription.js
- controllers/newsletterSubscription.js

```

### Feature (Cart Management)
#### Author - Aeshna Verma
```
- routes/customer/cart.js
- models/cart/Cart.js
- models/orders/Orders.js
- controllers/cart.js

```

### Feature (Professional Service Management)
#### Author - Prit Ajaykumar Sorathiya
```
- index.js
- routes/professional/service.js
- models/professional/Service.js
- controllers/professional/service.js
- controllers/order.js

```

### Feature (Customer Support)
#### Author - Rikin Pineshkumar Patel 
```
- controllers/professional/support.js
- models/professional/Contactus.js
- routes/professional/support.js

```

## Getting Started

### Prerequisites

To have a local copy of this project up and running on your local machine, you will first need to install the following software / libraries / plug-ins

- npm

```
npm install npm@latest -g
```

- deploy the project

```
install Heroku CLI
```

### Installing

A step by step process to run the project in the development env then delploy to heroku.

1. install NPM packages

```
npm install
```

2. authenticate heroku account

```
heroku login
```

3. Create a new app on heroku and add heroku remote to the project

```
heroku git:remote -a "project_name"
```

4. push the code on heroku

```
git push heroku master
```

## Deployment

- [Heroku](https://devcenter.heroku.com/start) - The cloud platform used for deployment.

## Built With

- [NodeJS](https://nodejs.org/en/) - JavaScript Runtime Environment