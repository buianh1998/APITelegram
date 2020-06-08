import express from "express";
let router = express.Router();
import { product, error } from "./../controller/index.controller";

let initRouterBot = (app) => {
    router.get("/product", product.getDataProduct);
    router.get("/product/:idProduct", product.getProductById);
    router.post("/product/create-product", product.createProduct);
    router.put("/product/edit-product/:idProduct", product.updateProduct);
    router.delete("/product/delete-product/:idProduct", product.deleteProduct);
    router.get("/error", error.getDataError);
    router.get("/error/:idError", error.getErrorByIdError);
    app.use("/bot", router);
};
module.exports = initRouterBot;
