import mongoose from "mongoose";


//create a schema
const movieSchema = new mongoose.Schema({
    name:{type:String,required:true},
    screens:{type:Array,required:true},
    languages:{type:Array,required:true},
    duration:{type:String,required:true},
    categories:{type:Array,required:true},
    releaseDate:{type:Date,required:true},
    certificate:{type:String,required:true},
    poster:{type:String,required:true},
    banner:{type:String,required:true}
})


export default mongoose.model.Movies || mongoose.model("Movies",movieSchema)



