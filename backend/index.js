const express = require("express");
const mongoose = require("mongoose");
const reddis = require('redis');

const redisClient = reddis.createClient(6379,'redis');
const app = express();

mongoose.connect('mongodb://db:27017/user')
    .then(() => console.log('Connected to MongoDB...'));

redisClient.on('connect', function() {
  console.log('Connected to Redis!');
});
redisClient.on("error", function(error) {
  console.log(error);
});

app.get("/", (req, res) => {
    res.send("<h1>Welcome to User Services!</h1>");
  });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));