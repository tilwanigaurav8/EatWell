const express=require('express');
const router=express.Router()
router.get('/about',function(req,res){
    res.render('about');
});

router.get('/',function(req,res){
    res.render('index');
});

module.exports=router;