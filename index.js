const express = require('express');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const app = express();
const path = require("path");
const port = 8001;
const {restrictToLoggedInUserOnly} = require('./middlewares/auth');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const cookieParser  = require('cookie-parser');

app.set("view engine", "ejs");
app.set("views", path.resolve("./views") );

// Cookie parser should come before any middleware using cookies
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Now, the middleware using cookies
app.use('/url',restrictToLoggedInUserOnly, urlRoute);
app.use('/user', userRoute);

// Rest of your code...

 
app.get('/shortened/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const newTimestamp = Date.now(); // Create a new timestamp for the visit
  
    try {
      const updatedURL = await URL.findOneAndUpdate(
        { shortId },
        {
          $push: {
            visitHistory: { timestamp: newTimestamp }
          }
        },
        { new: true } // To return the updated document after the update
      );
  
      if (!updatedURL) {
        return res.status(404).send('URL not found');
      }
      
      // Successfully updated the URL, redirect to the original URL
      res.redirect(updatedURL.redirectUrl);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
app.use('/', staticRoute);
app.listen(port, () => {
  console.log(`The server has started on port ${port}!`);
});
