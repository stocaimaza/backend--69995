import mongoose from "mongoose";

mongoose.connect("mongodb+srv://swtocaimaza:coderhouse@cluster0.pmzgicx.mongodb.net/Jugueteria?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Conectados a la BD"))
    .catch( (error) => console.log("Tenemos un error: ", error))