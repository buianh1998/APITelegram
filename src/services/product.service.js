import productModel from "./../models/product.model";
const LIMIT_DATA_PRODUCT = 12;
let getDataProduct = (page) => {
    return new Promise(async (resolve, reject) => {
        let start = (page - 1) * LIMIT_DATA_PRODUCT;
        let dataProduct = await productModel.getDataProduct(start, LIMIT_DATA_PRODUCT);
        let countDocument = dataProduct.length;
        let totalPagesProduct = Math.ceil(countDocument / LIMIT_DATA_PRODUCT);
        resolve({ dataProduct, totalPagesProduct });
    });
};
let getProductById = (id) => {
    return new Promise(async (resolve, reject) => {
        let getProductById = await productModel.getProductById(id);
        resolve(getProductById);
    });
};
let createProduct = (item) => {
    return new Promise(async (resolve, reject) => {
        let getDataByTitle = await productModel.getDataByTitle(item.title);
        if (getDataByTitle) {
            return reject(" Da Ton Tai");
        }
        let createProduct = await productModel.createProduct(item);
        resolve(createProduct);
    });
};
let updateProduct = (id, item) => {
    return new Promise(async (resolve, reject) => {
        let updateProduct = await productModel.updateProduct(id, item);
        resolve(updateProduct);
    });
};
let deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        let deleteProduct = await productModel.deleteProduct(id);
        resolve(deleteProduct);
    });
};
module.exports = {
    getDataProduct: getDataProduct,
    getProductById: getProductById,
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
};
