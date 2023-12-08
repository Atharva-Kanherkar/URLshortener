const express = require('express');
const router =  express.Router();
const URL = require('../models/url');

router.get('/', async (req, res) => {
    try {
        const urls = await URL.find({});
        return res.render("home", { urls: urls });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});











module.exports = router;