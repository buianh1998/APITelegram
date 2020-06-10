import mongoose from "mongoose";
import bluebird from "bluebird";
import helper from "./../helper/helper";
require("dotenv").config();

/**
 * Connect to Mongodb
 */
let connectDB = () => {
    mongoose.bluebird = bluebird;

    let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    return mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
        if (err) return helper.awaitMessage("Error Connect to mongodb", "Sai Đường dẫn kết nối tới mongodb");
        return console.log("Connect succesfully");
    });
};

module.exports = connectDB;
