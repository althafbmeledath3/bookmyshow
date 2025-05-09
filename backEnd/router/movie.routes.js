import express from "express"
import {addmovie,loadMovie,loadPreview,editMovie,deleteMovie} from "../controller/add_movie_controller.js"

import { signUp,logIn } from "../controller/user_add.js"

const movie_routes = express.Router()

movie_routes.post('/addmovie',addmovie)

movie_routes.get('/loadData',loadMovie)

movie_routes.get('/loadPreview/:id',loadPreview)

movie_routes.post('/editMovie/:id',editMovie)

movie_routes.get('/deleteMovie/:id',deleteMovie)

movie_routes.post('/signUp',signUp)

movie_routes.post('/logIn',logIn)

export default movie_routes




