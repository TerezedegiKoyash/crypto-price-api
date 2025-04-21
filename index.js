import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/price/:id', async (req, res) => {
  const id = req.params.id.toLowerCase();
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data[id] || !data[id].usd) {
      return res.status(404).send("Not found");
    }

    res.send(data[id].usd.toString());
  } catch (e) {
    res.status(500).send("Error: " + e.toString());
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
