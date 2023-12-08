const express = require("express");
const router = express.Router();
const { handleGenerateNewShortURL, handleGetAnalytics } = require('../controllers/url');
const { connectToMongoDB } = require('../connect');

router.post("/", handleGenerateNewShortURL);
router.get('/analytics/:shortId',handleGetAnalytics);

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
  .then(() => {
    console.log("MongoDB connected!");
  });

module.exports = router;  
