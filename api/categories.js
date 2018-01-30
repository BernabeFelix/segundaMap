import fetch from "node-fetch";

const url = "https://webapi.segundamano.mx/nga/api/v1.1/public/categories/insert?lang=es";

const getCategories = async () => {
  let res = await fetch(url);
  res = await res.json();

  return res;
};

exports.getCategories = getCategories;
