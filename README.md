# Backend for ToDoList App

#### App Preview

![Project](/preview.gif)

## Installation

You need to install Node.js, NPM, PostgreSql And Database Client (pgadmin4, dbeaver)

## How to use in your local device

- Clone or download Repository
- Open Directory using hyper, ubuntu, git bash, or terminal
- Install package with Run `npm i`
- Run server with `npm start` or `npm run dev`
- Open **http://localhost:8000** in your browser
- Open Postman or other REST client and try API function like Login, Register, Add, Delete, etc

#### Frontend Repository

**https://github.com/adittiyaasril/todolistfe**

## Package Used

- bcrypt
- body-parser
- cors
- dotenv
- express
- express-router
- jsonwebtoken
- pg
- sequelize
- sequelize-cli

## Mock Test Answer

1. Apakah Kegunaan JSON pada REST API?
   JSON sendiri merupakan singkatan dari (JavaScript Object Notation) yaitu sebuah format data yang digunakan untuk pertukaran dan penyimpanan data,
   JSON digunakan untuk mengirim data antara server dan client dalam bentuk yang terdiri dari objek dan array
   Pada RestAPI JSON digunakan sebagai format untuk bertukar data client dan server atau antar aplikasi.
2. Jelaskan bagaimana REST API bekerja
   RESTful API bekerja dengan cara memanipulasi resource dan representasi. Representasi ini saling dipertukarkan di antara pengguna dan server melalui HTTP.
   Jadi, saat pengguna ingin menggunakan fungsi suatu aplikasi, perangkatnya akan mengirimkan permintaan melalui HTTP ke server. Server akan mencari resource dan mengomunikasikan representasi state sebagai respons kepada pengguna melalui protokol yang sama. Representasi ini bisa dibuat dalam berbagai format, seperti JSON atau XML.
