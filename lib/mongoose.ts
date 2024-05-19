import mongoose from "mongoose";

let isConnected=false;


export const connecTtoDB=async ()=>{
    mongoose.set("strictQuery",true);

    if(!process.env.MONGODB_URL){
        console.log("Please add your mongo url...");
    }

    if(isConnected){
        console.log("Connected to MongoDB server...");
        return;
    }

    try {
        if(process.env.MONGODB_URL){
            await mongoose.connect(process.env.MONGODB_URL);

            isConnected=true;

            console.log("Connected to MONGODB server");
        }
    } catch (error) {
        console.log("Error connecting to mongo server",error);
        
    }
}