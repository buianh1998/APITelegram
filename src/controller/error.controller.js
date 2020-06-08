import { errors } from "./../services/index.service";
import helper from "./../helper/helper";
let getDataError = async (req, res) => {
    let page = req.query.page || 1;
    let getDataError = await errors.getDataError();
    res.json({ result: true, getDataError });
};
let getErrorByIdError = async (req, res) => {
    try {
        let { idError } = req.params;
        let getErrorByIdError = await errors.getErrorByIdError(idError);
        res.json({ result: true, getErrorByIdError });
    } catch (error) {
        let errorItem = `Lỗi: ${error}`;
        await helper.awaitMessage("Xem Chi tiết thất bại", errorItem);
        return res.status(500).send(error);
    }
};
module.exports = {
    getDataError,
    getErrorByIdError,
};
