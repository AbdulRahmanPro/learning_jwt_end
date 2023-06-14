var express = require('express');
var router = express.Router();
var allServices = require("../services/allServices")
var {ReqAuth}= require("../services/firewallToken")
    /* GET home page. */
router.get("/singup" , allServices.signup_get)
router.post("/singup", allServices.signup_post )
router.get("/login", allServices.login_get)
router.post("/login",allServices.login_post)
router.get("/set-cookies",allServices.set_cookies)
router.get("/read-cookies",allServices.get_cookies)
router.get("/Show",ReqAuth,(req,res)=>{res.render("home")})
router.get("/logout",allServices.logout)

// هناك خطـ عليك تحديثه بصباح الباكر


module.exports = router;
