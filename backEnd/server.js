import express from "express"
import connection from "./connection.js"
import movieSchema from "./models/movie.models.js"
import path, { dirname,join } from "path"
import url from "url"
import { error } from "console"



//port number
const port = 3000

const app = express()
//file name
const file_name = url.fileURLToPath(import.meta.url)
//directory name
const __dirname = dirname(file_name)
const front_end = join(__dirname,"..","frontEnd")
//frontend folder to use as static
app.use(express.static(front_end))
//json middleware
app.use(express.json({ limit: "20mb" }))



//addmovie section
app.post('/addMovie',async (req,res)=>{
    console.log("Inside add movie")
    console.log(req.body)

    try{
        const { name, screens, languages, duration, certificate, categories, releaseDate, poster, banner } = req.body
        console.log("Data Recieved",name, screens, languages, duration, certificate, categories, releaseDate, poster, banner)

       

        //check error
        if (!name || !screens || !languages || !duration || !certificate || !categories || !releaseDate || !poster || !banner) {
            return res.status(404).send({ error: "please fill all fields" })
        }

        //add to database
        const data = movieSchema.create({name,screens,languages,duration,certificate,categories,releaseDate,poster,banner})
        res.status(201).send(data)
    }
    catch(err){
        res.status(500).send({error:err})
    }
})


//loadMovie to frontEnd
app.get('/loadData',async(req,res)=>{
    
    try{
        const data = await movieSchema.find()
        res.status(200).send(JSON.stringify(data))

    }
    catch(err){
        res.status(500).send({error:err})
    }
    
})


//send preview and all details to frontend
app.get('/loadPreview/:id',async(req,res)=>{

    try{
        const movieId = req.params.id
        //now find the id and send data
        const data = await movieSchema.findById(movieId)
        res.status(200).send(JSON.stringify(data))

    }
    catch(err){
        res.status(500).json({error:err})
    }
    

})

//function to edit movie
app.post('/editMovie/:id', async (req, res) => {
    
    try {
        const updatedMovie = await movieSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(201).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ error: "Error updating movie" });
    }
});

//function to delete movie
app.get('/delete/:id',async(req,res)=>{
    try{

        const movie_id = req.params.id
        const deleteMovie = await movieSchema.findByIdAndDelete(movie_id)
        res.status(200).json('Movie Deleted Success')

    }
    catch(err){
        res.status(500).send({error:err})
    }
    

})



//first connect database then run the server
connection().then(()=>{
    app.listen(port,()=>{
        console.log("Server running on http://localhost:3000")
    })
}).catch((err)=>console.log(err))












