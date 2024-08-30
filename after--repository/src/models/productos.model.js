import mongoose from "mongoose";

const schema = new mongoose.Schema({
    nombre: String, 
    categoria: String,
    // fullname: {
    //     type: String, 
    //     required: true
    // }, 
    precio: Number
})

const ProductoModel = mongoose.model("juguetes", schema); 

export default ProductoModel; 
