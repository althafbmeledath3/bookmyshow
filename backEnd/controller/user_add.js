import { response } from "express"
import userSchema from "../models/user.models.js"
import bcrypt from "bcrypt"

export const signIn =  async function signIn(req,res) {

    try{

        const {name,email,phone,password} = req.body

        if(!(name && email && phone && password)){
            return res.status(400).send("Enter full details")
        }

        bcrypt.hash(password,10).then(async(hashed_pwd)=>{

            console.log(req.body)
            console.log(hashed_pwd)

            const data = await userSchema.create({name,email,phone,password:hashed_pwd})

            
            res.status(201).send(data)
        })



        
        
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
        
        console.log("Logged In",data)
        res.status(200).send(data)
    }
    catch(err){

        res.status(500).json({error:err})
        console.log(err)
    }
}



