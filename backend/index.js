const express = require("express");
const mongoose = require("mongoose");
const redis = require('redis');
const users = require('./routes/userRoute');

const redisClient = redis.createClient(6379,'localhost');
const app = express();

app.use(express.json());
app.use('/api/users', users);

mongoose.connect('mongodb://localhost:27017/user')
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