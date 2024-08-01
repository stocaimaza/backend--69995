import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse69990:coderhouse@cluster0.k8gmho6.mongodb.net/Login?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexion exitosa!"))
    .catch(() => console.log("Alto error, vamos a llorar toda la semana"))