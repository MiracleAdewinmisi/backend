const userModel = require("../models/user.models")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const showWelcome = (req, res) => {
    res.send("Hello Node Dev")
  };

  const showRegister = (req, res) => {
    console.log(req.body)
    let newUser = new userModel(req.body);
  newUser.save()
  .then((user)=>{
    console.log("user created")
    res.send({status:true, message: "user created"})
  })
  .catch((err)=>{
    console.log("user not created")
    res.send({status:false, message:"user not created"})
  })

}


  const signin = (req, res )=>{
    let {email, password} = req.body;
    userModel.findOne({email:req.body.email})
    .then((user)=>{
      user.comparedPassword(password, (er, isMatch)=>{
        let schoolPortal = process.env.SECRET
        console.log(isMatch);
        if (isMatch){
          jwt.sign({email}, schoolPortal, {expiresIn :"1h"},(err, token)=>{
             if (err){
              console.log(err);
             } else{
              console.log(token);
              res.send({status:true, message:"user found", token:token})
             }
          } )


        } else{
          res.send({status:false, message:"user not found"})
        }
      })
      console.log("user found");
    })
    .catch((err)=>{
      console.log("user not found")
    })
  }

const getDashboard = (req, res)=>{
let schoolPortal = process.env.SECRET
let token = req.headers.authorization.split(" ")[1]
jwt.verify(token, schoolPortal, (err, result)=>{
  if(err){
    console.log(err);
    res.send({status:false, message:""})
  } else{
    console.log(result);
  }
})
}

  module.exports = {showWelcome, showRegister, signin, getDashboard}