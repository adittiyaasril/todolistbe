require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  'https://todolistfe-seven.vercel.app',
  'http://localhost:3000', 
];

app.use(
  cors({
    origin: origin: allowedOrigins,,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./models");
db.client.sync();

const router = require("./routes");
app.use(router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
