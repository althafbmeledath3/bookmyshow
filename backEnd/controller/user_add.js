import { response } from "express";
import userSchema from "../models/user.models.js";
import bcrypt from "bcrypt";

export const signUp = async function signUp(req, res) {
  try {
    const { username, email, phone, password } = req.body;

    console.log(req.body);
    if (!(username && email && phone && password)) {
      // return res.status(400).send("Enter full details")
      console.log("SOme rofods");
    }

    bcrypt.hash(password, 10).then(async (hashed_pwd) => {
      console.log(req.body);
      console.log(hashed_pwd);

      const data = await userSchema.create({
        username,
        email,
        phone,
        password: hashed_pwd,
      });

      res.status(201).send(data);
    });
  } catch (err) {
    console.log(err);
  }
};

//login functionality
export const logIn = async function logIn(req, res) {
  try {
    const { email, password } = req.body;

    const userExist = await userSchema.findOne({ email });

    //check use exist or not
    if (!userExist) {
      return res.status(400).json({ message: "User not found" });
    }

    const ispassMatch = await bcrypt.compare(password, userExist.password);

    if (!ispassMatch) {
      return res.status(400).json({ message: "Passwords is wrong" });
    }

    res.status(200).json({ message: "Logged in success" });

  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

// export const getUsers = async function getUsers(req,res){

//     const {name,password} = req.body

//     try{
//         const data = await userSchema.findOne({name,password})

//         if(!data){
//             return res.status(404).json({message:"User Not Found"})
//         }

//         console.log("Logged In",data)
//         res.status(200).send(data)
//     }
//     catch(err){

//         res.status(500).json({error:err})
//         console.log(err)
//     }
// }
