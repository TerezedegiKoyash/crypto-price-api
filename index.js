// index.js
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/price/:id", async (req, res) => {
  const id = req.params.id;
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data[id] || !data[id].usd) {
      return res.status(404).send("Not found");
    }

    res.send(data[id].usd.toString());
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
