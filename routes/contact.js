const contacts =require('../constants/contact');
const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.render('contact',{contact:contacts});
})


module.exports=router;