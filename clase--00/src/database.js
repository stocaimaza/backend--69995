import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse69990:coderhouse@cluster0.k8gmho6.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Nos conectamos a MONGODB"))
    .catch( (error) => console.log(error))