import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect("mongodb+srv://abdusslamasif8955:q5Nh4sTrDpKqpea0@cluster0.y4y7f55.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("DB Connected");

}