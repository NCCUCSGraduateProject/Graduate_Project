const express = require('express');
const router = express.Router();
const direction = require('../services/direction.js')

router.get('/nearbyPoints', async (req, res) => {
  let result  = await direction.nearbyPoints(req.query.originLat, req.query.originLng, req.query.destLat, req.query.destLng, req.query.limitDistance, req.query.splitRange || 1000)
 // res.json({"hello":"hello"})
  res.json(result)
  
})

module.exports = router