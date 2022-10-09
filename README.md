# Demo e-commerce

Demo of an ecommerce made with express js for the server part and svelte for the front end.

## Features

- Admin Panel (product creation and order management, user views)
- Registration
- Login
- Search on the products page
- Shopping cart management
- Authentication
- Simulation of the purchase (it is not necessary to be logged in)
- View order status
- Management of sending emails for: password change, order notification
- Mongodb database (using <a href="https://cloud.mongodb.com/">MongoDb Cloud</a> )

## Libraries

Server side
- Express
- Mongoose to handle database
- Nodemailer for sending emails

Front end side
- Svelte
- Bootstrap 5.2 with SASS integration

# Getting started

To run the server side, in this folder:

```bash
npm run dev
```

To run the client side, go to `client` folder and then:

```bash
npm run dev
```

## Requirements

- Node `v16.17.0`

Run Chrome with disabled cors option (OS X)

```
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

### Useful links

<ul>
    <li><a href="https://github.com/svelte-add/bootstrap">Add bootstrap to svelte</a></li>
    <li><a href="https://blog.logrocket.com/how-switch-node-js-versions-nvm/">Manage multiple version of Node.js with nvm</a></li>
    <li><a href="https://www.youtube.com/watch?v=wCelDI_rPcY">Run svelte and express in same port</a> (necessario per dopo?)</li>
</ul>

