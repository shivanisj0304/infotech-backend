var express = require('express');
var router = express.Router();
var pool=require('./pool')
// var jwt= require("jsonwebtoken");
// var LocalStorage = require("node-localstorage").LocalStorage;
// localStorage= new LocalStorage("./scratch");

/* GET home page. */
router.post('/chkadminlogin', function(req, res, next) {
    
  pool.query("select * from user where email=? and password=?",[req.body.email,req.body.password],function(error,result){
  if(error)
  {   
      console.log(error)
      res.status(500).json({result:false})
  }
  else
  {
       if(result.length==0)
        {   res.status(200).json({result:false})}
      else
        {    res.status(200).json({result:true,data:result})}}
  
  })
  });
  
/*router.get('/assignToken',function(req,res,next){
try{
  var token=jwt.sign({id:100},'thenumericinfosystempvtltdgwalior',{expiresIn:"120s"})
  console.log(token)
  //localStorage.setItem("token",token)
  res.status(200).json({access_token:token})
}
catch(e)
{
  console.log("GET TOKEN:",e)
  res.status(500).json({access_token:null})
}
})*/

/* router.get('/readToken',function(req,res,next){
  try{
       var v = jwt.verify(
         localStorage.getItem("token"),
         "thenumericinfosystempvtltdgwalior"
       );
      //  console.log(res)
       console.log("token",v);
  }
  catch(e)
          {
          console.log("Error",e.message);
    }
}) */











module.exports = router;