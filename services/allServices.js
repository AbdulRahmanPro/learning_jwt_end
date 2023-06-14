const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser")
const userSingUp_Shcema = require("../models/userModle");
var express = require("express");
const { model } = require("mongoose");
const { token } = require("morgan");
var app = express();
app.use(cookie());
const handleErrors = async (err)=>{
  await console.log(err.message)
  let errors = {email:'', password:''}
  if(err.message ==="بريد الكتروني غير صحيح"){
    errors.email = "بريد الكتروني غير صحيح"
  }
  if(err.message ==="كلمة المرور غير صحيحة"){
      errors.password="كلمة المرور غير صحيحة"
  }
  if(err.message.includes('User validation failed')){
    Object.values(err.errors).forEach(({properties}) =>{
      errors[properties.path] = properties.message;
    })
  }
  

  return errors;
}
const maxAge= 3*24*60*60
const cratetoken= (id)=>{
  return jwt.sign({id},"تم انشاء توكن جيديد",{
    expiresIn:maxAge
  })

}
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.signup_get = (req, res) => {
  res.render("singup");
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try{
    const user =await userSingUp_Shcema.login(email,password)
    const token = cratetoken(user._id)
    res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
    res.status(200).json({user:userSingUp_Shcema._id})

  }catch(err){
    const error = await handleErrors(err)
    res.status(400).json({error})
  }
};  
module.exports.logout=(req,res)=>{
  res.clearCookie("jwt")
    res.redirect("/")
}
module.exports.signup_post = async (req, res) => {
  const { name, username, password, email } = req.body;
    console.log(email);
  try {
    const existingUser = await userSingUp_Shcema.findOne({ email });
    if (existingUser) {
      console.log("بريد إلكتروني مستخدم بالفعل")
      return res.status(409).json({ error: "بريد إلكتروني مستخدم بالفعل" });
    } else {
      const user = await userSingUp_Shcema.create({
        name,
        email,
        username,
        password,
      });
      const tokenes = cratetoken(user._id)
      res.cookie("jtw",tokenes,{httpOnly:true,maxAge:maxAge*1000})
      res.status(201).json({user:user._id});
      }
  } catch (err) {
     const error = await handleErrors(err)
     res.status(400).json({error})
  }
};
module.exports.set_cookies = (req ,res)=>{
  res.cookie('newb123',true,{maxAge:1000*60*60*24,httpOnly:true})
  res.send("تم ارسال البسكويت")
}
module.exports.get_cookies = (req,res)=>{

  const cookies = req.cookies
  console.log(cookies)
  res.json(cookies)

}


