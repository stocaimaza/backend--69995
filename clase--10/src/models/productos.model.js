import mongoose from "mongoose";

const schema = new mongoose.Schema({
    nombre: String, 
    categoria: String,
    precio: Number
})

const ProductoModel = mongoose.model("juguetes", schema); 

export default ProductoModel; 
