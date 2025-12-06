const router = require('express').Router();
router.post('/', async (req,res)=>{
  console.log('Termii webhook:', req.body);
  res.json({status:'ok'});
});
module.exports = router;