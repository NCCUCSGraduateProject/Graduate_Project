const express = require('express');
const router = express.Router();
const direction = require('../services/direction.js')

router.get('/nearbyPoints', async (req, res) => {
  let result  = await direction.nearbyPoints(req.query.originLon, req.query.originLat, req.query.destLon, req.query.destLat, req.query.limitDistance)
 // res.json({"hello":"hello"})
  res.json(result)
  
})

module.exports = router