<h1 align="center">
  Mailer 📫
  <h3 align="center">A micro-saas to send e-mails for your business! 📩🏢</h3>
</h1>

<p align="center">
  <a href="https://coveralls.io/github/DanielAraldi/mailer?branch=main">
    <img src="https://coveralls.io/repos/github/DanielAraldi/mailer/badge.svg?branch=main" alt="Coverage Status" />
  </a>
  <a href="https://wakatime.com/badge/user/920a7e43-2969-4212-82ff-1b375685ff58/project/00e95626-aa7e-4501-a6fd-3f315bc40b35">
    <img src="https://wakatime.com/badge/user/920a7e43-2969-4212-82ff-1b375685ff58/project/00e95626-aa7e-4501-a6fd-3f315bc40b35.svg" alt="Wakatime" />
  </a>
</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/DanielAraldi/Mailer?style=flat-square">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/DanielAraldi/Mailer?style=flat-square">
  <img alt="GitHub" src="https://img.shields.io/github/license/DanielAraldi/Mailer?style=flat-square">
</p>

<p align="center">
  <a href="#📖-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#📫-api">API</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#🛠️-how-to-execute">How to Execute?</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#🏷️-license">License</a>
</p>

## 📖 About

The Mailer is a service used only to send e-mail messages to people, it's focused to the business. We recommend that you use your app passwords that it's available from Google. You can create an app password [clicked here](https://myaccount.google.com/apppasswords).

## 📫 API

There are Mailer's endpoint. All endpoint starts with slug `/api`.

[`/send`](./requirements/send.md) - Endpoint to send e-mail message.

## 🛠️ How to Execute?

- ### **Prerequisite**

  - It's **necessary** to possess the **[Git](https://git-scm.com/)** and **[Docker](https://www.docker.com/products/docker-desktop/)** installed and configured in your computer.
  - Also, it's **need** to have a package manager as **[Yarn](https://yarnpkg.com/)**, **[NPM](https://www.npmjs.com/)**, etc.
  - Finally, it's **necessary** to have **[Node.js](https://nodejs.org/en)** greater or equal version 16.13.x.

1. Make a clone of repository:

```sh
  $ git clone https://github.com/DanielAraldi/mailer.git
```

2. Added environment variables:

Create a new file on root path called `.env`. Using the `.env.example` file as model and added the variables that exist it for your `.env` file.

3. Executing the application:

```sh
  $ npm i # or yarn install to install all dependencies.
  $ npm run build # or yarn build to create dist folder with `.js` files that will be used in production.
  $ npm run up # or yarn up to run database in the docker. To stop the database run the `npm run stop` command.
  $ npm run start # or yarn start to run application.
```

## 🏷️ License

This e-mail service went development by [Daniel Sansão Araldi](https://github.com/DanielAraldi) and [Rafael Mota Alves](https://github.com/RafaelMotaAlvess). We use the [MIT license](./LICENSE).
