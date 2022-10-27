const express = require('express');
const router = express.Router();
const autoComplete = require('../services/autoComplete.js')

router.get('/predict', async (req, res) => {
 
  let result  = await autoComplete.predict(req.query)
  res.json(result)

})

module.exports = router