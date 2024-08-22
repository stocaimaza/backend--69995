import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse69990:coderhouse@cluster0.k8gmho6.mongodb.net/Heladeria?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a la BD"))
    .catch((error) => console.log("Tenemos un error fatal: ", error))