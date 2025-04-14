



import mongoose from "mongoose";

//export
export default async function connection(){

    //create database
    const db = await mongoose.connect("mongodb://localhost:27017/moviedb")
    console.log("DataBase connected")
    
    return db
}
