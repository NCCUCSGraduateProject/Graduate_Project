const express = require('express');
const router = express.Router();
const autoComplete = require('../services/autoComplete.js')

router.get('/predict', async (req, res) => {
  console.log(req.query);
  let result  = await autoComplete.predict(req.query)
  res.json(result)

})

router.get('/detail', async (req, res) => {
  console.log(req.query.place_id);
  let result  = await autoComplete.detail(req.query.place_id)
  res.json(result)
})

module.exports = router