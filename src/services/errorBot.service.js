import errorModel from "./../models/errorMessage.model";
let getDataError = () => {
    return new Promise(async (resolve, reject) => {
        let dataError = await errorModel.getDataError();
        resolve(dataError);
    });
};
let getErrorById = (id) => {
    return new Promise(async (resolve, reject) => {
        let getErrorById = await errorModel.getErrorById(id);
        resolve(getErrorById);
    });
};
let getErrorByIdError = (idError) => {
    return new Promise(async (resolve, reject) => {
        let getDataByIdError = await errorModel.getDataByIdError(idError);
        resolve(getDataByIdError);
    });
};
let createError = (item) => {
    return new Promise(async (resolve, reject) => {
        let createError = await errorModel.createError(item);
        resolve(createError);
    });
};
module.exports = {
    getDataError,
    getErrorById,
    getErrorByIdError,
    createError,
};
