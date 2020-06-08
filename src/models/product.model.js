import mongoose from "mongoose";
let productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: String,
    quality: Number,
    description: String,
    createdAt: { type: Number, default: Date.now() },
    updatedAt: { type: Number, required: null },
});
productSchema.statics = {
    getDataProduct(start, LIMIT_DATA_PRODUCT) {
        return this.find().skip(start).limit(LIMIT_DATA_PRODUCT).sort({ createdAt: -1 }).exec();
    },
    countDataProduct() {
        return this.countDocuments().exec();
    },
    getProductById(id) {
        return this.findById(id);
    },
    getDataByTitle(title) {
        return this.findOne({ title: title });
    },
    searchDataProduct(item) {
        return this.find({ title: { $regex: new RegExp(item, "i") } });
    },
    createProduct(item) {
        return this.create(item);
    },
    updateProduct(id, item) {
        return this.findByIdAndUpdate(id, item).exec();
    },
    deleteProduct(id) {
        return this.findByIdAndDelete(id).exec();
    },
};
productSchema.pre(/^find/, function (next) {
    this.populate({ path: "idCate", selete: "-_v" });
    next();
});
module.exports = mongoose.model("product", productSchema);
