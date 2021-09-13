var express = require('express');
var router = express.Router();
var pool=require("./pool");
var upload=require("./multer");

/* GET users listing. */
router.post('/addnewcandidate',upload.any(), function(req, res, next) {
  var name=req.body.firstname+" "+req.body.lastname;
    console.log(req.body);
  pool.query("insert into user (name,address,email,phone,icon,password,gender) values(?,?,?,?,?,?,?)",
  [  name,
      req.body.address,
      req.body.email,
       req.body.phone,
       req.files[0].originalname,
       req.body.password,
      req.body.gender],
       function(error,result){
      if(error)                                                                                       
         { console.log(error)
          res.status(500).json({result:false})
         }
      else{
        console.log(result);
          res.status(200).json({result:true})
          }

  })

});
router.get('/displayall',function(req,res){
  pool.query("select * from user",function(error,result){
      if(error){
               res.status(500).json([])
           }
      else{
          res.status(200).json(result)
         }
  })
});

router.post('/editicon',upload.single('icon'), function(req, res, next) {

  pool.query("update user set icon=? where userid=?",
  [req.file.originalname,req.body.userid],
  function(error,result){
      if(error)                                                                                       
         { console.log(error)
          res.status(500).json({result:false})
         }
      else{
          res.status(200).json({result:true})
          }

  })

});

router.post('/edituser', function(req, res, next) {
  var name=req.body.firstname+" "+req.body.lastname;
  pool.query("update user set name=?,address=?,email=?,phone=?,password=?,gender=? where userid=?",
  [ name,
    req.body.address,
    req.body.email,
    req.body.phone,
    req.body.password,
    req.body.gender,
    req.body.userid]
  ,function(error,result){
      if(error)
      {
          console.log(error)
          res.status(500).json({result:false})
      }
      else{
          console.log(result)
          res.status(200).json({result:true})
      }
  })


});
router.post('/deleteuser', function(req, res, next) {

  pool.query("delete from user where userid=?",
  [req.body.userid],
  function(error,result){
      if(error)                                                                                       
         { console.log(error)
          res.status(500).json({result:false})
         }
      else{
          res.status(200).json({result:true})
          }

  })

});




module.exports = router;
