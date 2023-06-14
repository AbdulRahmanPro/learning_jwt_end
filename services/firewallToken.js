const jwt = require("jsonwebtoken");

const ReqAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // فحص ان توكن صالح
  if (token) {
    jwt.verify(token,'تم انشاء توكن جيديد',(err,decodedToke)=>{
        if(err){
          console.log(err.message)
        }else{
          console.log(decodedToke)
          next()
        }
    })
}
 else {
  res.redirect("/login");
 }
};

module.exports = { ReqAuth };
