const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  const shortID = shortid.generate(); // Ensure shortid is required correctly

  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.render("home", {
    id:shortID
  });
};

 

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
  
    try {
      const result = await URL.findOne({ shortId });
  
      if (!result) {
        return res.status(404).json({ error: 'URL not found' });
      }
  
      const totalClicks = result.visitHistory.length;
      return res.json({ totalClicks });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };
