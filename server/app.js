const express = require("express");
const app = express();
const port = 8005;

app.get("/", (req, res) => {
  res.send("Server Started");
});

app.listen(port, () => {
  console.log(`Server listening on port no ${port}`);
});
