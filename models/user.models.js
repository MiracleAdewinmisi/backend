const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

let userSchema = new mongoose.Schema({
    firstName: String,
    email: String,
    lastName: String,
    password: {type:String, required:true, unique:true}
  });

  userSchema.pre("save",function(next){
    bcrypt.hash(this.password,saltRounds).then((hash)=>{
      this.password = hash
      console.log(hashedPassword);
      next()
    }).catch((err)=>console.log(err))
  })

  let user =mongoose.model("users", userSchema)






  userSchema.methods.comparedPassword = function(userPassword,callback){
    bcrypt.compare(userPassword, this.password, (err, isMatch)=>{
      if(err){
        return callback(err)
      }
      else{
        if(!isMatch){
          return callback(null, isMatch)
        }
        else{
          return callback(null, this)
        }
      }
    })
  }


  module.exports = userModel
  