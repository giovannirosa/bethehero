const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.json({
    nome: "Bebeta",
    msg: "Te amo <3"
  });
});

app.listen(3333);
