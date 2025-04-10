import { response } from "express"
import userSchema from "../models/user.models.js"


export const signIn =  async function signIn(req,res) {

    try{

        const {name,email,phone,password} = req.body

        if(!(name && email && phone && password)){
            return res.status(400).send("Enter full details")
        }

        const data = await userSchema.create(req.body)

        console.log(req.body)
        res.status(201).send(data)
        
    }

    catch(err){

        console.log(err)
    }
    
}


export const getUsers = async function getUsers(req,res){

    const {name,password} = req.body

    try{
        const data = await userSchema.findOne({name,password})

        if(!data){
            return res.status(404).json({message:"User Not Found"})
        }
        
        console.log("fsdfsdf",data)
        res.status(200).send(data)
    }
    catch(err){

        res.status(500).json({error:err})
        console.log(err)
    }
}



