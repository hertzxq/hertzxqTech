const express = require("express");
let app = express();


app.get('/server', (req, res) => {
  res.json(["first", "lol"]);
});

app.listen(8080, () => {
  console.log("Working =)");
});

