import express from "express";
import handlebars from "express-handlebars";
import socket from "./socket.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import messagesRouter from "./routes/messages.router.js";
import viewsRouter from "./routes/views.router.js";
import cookie from "./routes/cookie.router.js"

import __dirname from "./utils.js";

const env = async () => {
  dotenv.config();

  const PORT = process.env.PORT || 8080;
  const DB_NAME = process.env.DB_NAME;
  const DB_USERNAME = process.env.DB_USERNAME;
  const DB_PASSWORD = process.env.DB_PASSWORD;

  const app = express();
  app.use(session({secret:'secretCoder', resave:true, saveUninitialized:true}))
  app.use(cookieParser(("Coderclave1234")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(`${__dirname}/public`));

  app.use("/api/products", productsRouter);
  app.use("/api/carts", cartsRouter);
  app.use("/api/messages", messagesRouter);
  app.use("/", viewsRouter);
  app.use("/api/cookie", cookie);

  app.engine("handlebars", handlebars.engine());
  app.set("view engine", "handlebars");
  app.set("views", __dirname + "/views");

  const httpServer = app.listen(`${PORT}`, () =>
    console.log("Server up in port 8080!")
  );

 /* app.use("/setCookie"),
    (req, res) => {
      res
        .cookie("CoderCookie", "Una cookie compleja", { signed: true })
        .send("Cookie created");
    };

  app.use("/getCookies"),
    (req, res) => {
      res.send(req.cookies);
    };

  app.use("/clearCookies"),
    (req, res) => {
      res.clearCookie("CoderCookie").send("Cookie Deleted");
    };
*/
  mongoose.connect(
    `mongodb+srv://soylautaa:4530622La@coderclass.faf26nj.mongodb.net/?retryWrites=true&w=majority`
  );

  socket.connect(httpServer);
};

env();
