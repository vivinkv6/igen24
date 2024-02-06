var express = require('express');
var router = express.Router();

const targetDate = new Date(2024, 1, 8, 4, 30, 0);
// const targetDate = new Date(2024, 1, 3, 12, 1, 0);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/time',(req,res)=>{
  
  const currentDate = new Date();
  const timeDifference = targetDate - currentDate;

  // Calculate remaining days, hours, minutes, and seconds
  const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const remainingHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // You can send the remaining time as a response
  res.json({
    remainingDays,
    remainingHours,
    remainingMinutes,
    remainingSeconds,
  });
})


module.exports = router;
