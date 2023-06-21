import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        reqired: true
    },
    slug: {
        type: String,
        reqired: true
    },
    description: {
        type: String,
        reqired: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'category',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    photo: {
        data: Buffer,   //data or type
        contentType: String,

    },
    shipping: {
        type: Boolean,

    },

}, { timestamps: true })




export default mongoose.model('Products', productSchema)