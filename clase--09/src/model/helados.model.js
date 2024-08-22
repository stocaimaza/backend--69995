import mongoose from "mongoose";

const schema = new mongoose.Schema({
    nombre: String,
    sabor: String, 
    descripcion: String
})

const HeladoModel = mongoose.model("helados", schema);

export default HeladoModel;