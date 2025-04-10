import movieSchema from "../models/movie.models.js"




export const addmovie =  async function addmovie(req,res) {

    console.log("Inside add movie")
    // console.log(req.body)
    console.log("hello in add movie")

    console.log(movieSchema)

    try{
        const { name, screens, languages, duration, certificate, categories, releaseDate, poster, banner } = req.body
        // console.log("Data Recieved",name, screens, languages, duration, certificate, categories, releaseDate, poster, banner)

       

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
    
}


export const loadMovie = async function loadMovie(req,res) {

    console.log("Inside load movie")

    try{
        const data = await movieSchema.find()
        res.status(200).send(JSON.stringify(data))
    }
    catch(err){

        res.status(500).send({error:err})
    }
}



export const loadPreview = async function loadPreview(req,res) {

    try{
        const id = req.params.id
        
        console.log(id)
        console.log("helli inside load preview")
        const data = await movieSchema.findById(id)
       
        res.status(200).send(JSON.stringify(data))
       
    }
    catch(err){
        res.status(500).send({error:err})
    }

    
}



export const editMovie = async function editMovie(req,res) {
    
    try{
        const updatedMovie = await movieSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}

        )
        res.status(201).json(updatedMovie)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Error updating movie"})
    }
}


export const deleteMovie = async function deleteMovie(req,res) {

    try{
        
        const movie_id = req.params.id
        const deleteMovie = await movieSchema.findByIdAndDelete(movie_id)
        res.status(200).json("Movie Delted Sucesfully")
    }
    catch(err){

        res.status(500).send({error:err})
    }
}





