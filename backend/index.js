const express = require("express");
const app = express();

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/redis')();



app.get("/", (req, res) => {
    res.send("<h1>Welcome to User Services!</h1>");
  });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));