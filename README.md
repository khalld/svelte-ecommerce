[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<div align="center">
  <a href="https://github.com/khalld/svelte-ecommerce">
    <img src="https://cdn4.iconfinder.com/data/icons/game-of-thrones-4/64/game_of_thrones_game_thrones_series_character_avatar_dragon-512.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Svelte e-commerce demo</h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <!-- <a href=""><strong>Explore the docs »</strong></a> -->
    <br />
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a> (SOON) -->
    View Demo (SOON)
    ·
    <a href="https://github.com/khalld/svelte-ecommerce/issues">Report Bug</a>
    ·
    <a href="https://github.com/khalld/svelte-ecommerce/issues">Request Feature</a>
  </p>
</div>


## About the project

Demo of a real case of ecommerce made for Web programming, Design & Usability (Università degli studi di Catania - Magistrale in Informatica (Curriculum Data Science) A.A. 2022-2023)


<img src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg" width=25>


* [![Svelte][Svelte.dev]][Svelte-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

## Features

- Admin Panel:
    - Creation of Product
    - Order management
    - User views
- Authentication
- Searchbar (on products page)
- Shopping cart management
- Simulation of purchase (it is not necessary to be logged in)
- Order status
- Notify with email for: password recovery, after checkout and when the status of order change
- MongoDb (using <a href="https://cloud.mongodb.com/">MongoDb Cloud</a> )

## Libraries

Server side
- Express
- Mongoose to handle database
- Nodemailer to sending emails

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

