import mongoose from "mongoose";




const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        requred: true,
        unique: true,
    },
    slug: {
        type: String,
        lowercase: true
    }
})




export default mongoose.model('category', categorySchema)