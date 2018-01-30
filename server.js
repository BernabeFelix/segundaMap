const express = require("express");
import { getCategories } from "./api/categories";

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/categories", async (req, res) => {
  try {
    res.send(await getCategories());
  } catch (e) {
    console.log(res.send(e.message));
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
