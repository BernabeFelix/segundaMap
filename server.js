const express = require("express");
import { getAds } from "./api/utils";
import { queryData } from "./api/query";
import { getCategories } from "./api/categories";

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/categories", async (req, res) => {
  try {
    res.send(await getCategories());
  } catch (e) {
    console.log(res.send(e));
  }
});

app.get("/api/query", async (req, res) => {
  try {
    res.send(getAds(await queryData(req.query)));
  } catch (e) {
    console.log(res.send(e));
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
