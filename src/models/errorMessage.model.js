import mongoose from "mongoose";
let errorSchema = new mongoose.Schema({
    idError: String,
    title: String,
    description: String,
    createdAt: String,
});
errorSchema.statics = {
    getDataError() {
        return this.find().sort({ createdAt: -1 }).exec();
    },
    countDataProduct() {
        return this.countDocuments().exec();
    },
    getErrorById(id) {
        return this.findById(id);
    },
    getDataByIdError(idError) {
        return this.findOne({ idError: idError });
    },
    createError(item) {
        return this.create(item);
    },
};
module.exports = mongoose.model("erro", errorSchema);
