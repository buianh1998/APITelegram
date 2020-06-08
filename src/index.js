import express from "express";
let app = express();
require("dotenv").config();
let port = process.env.PORT || 3000;
import connectDB from "./config/connectDB";
import initRouterBot from "./router/telegramRouter";
initRouterBot(app);
connectDB();
app.listen(port, () => {
    console.log(`Wecome to ${process.env.HOST}:${process.env.PORT}`);
});
