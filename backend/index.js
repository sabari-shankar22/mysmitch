const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect('mongodb://db/vidly')
    .then(() => console.log('Connected to MongoDB...'));

app.get("/", (req, res) => {
    res.send("<h1>Welcome to User Services!</h1>");
  });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));