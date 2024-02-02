const express=require('express');
const router=express.Router();
const sponsors=require('../constants/sponsors');

router.get("/", function (req, res, next) {
    res.render("sponsors", {
      sponsors: sponsors,
    });
  });

module.exports=router