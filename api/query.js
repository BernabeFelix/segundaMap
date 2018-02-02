import fetch from "node-fetch";
import queryString from "query-string";

const url = "https://webapi.segundamano.mx/nga/api/v1/public/klfst?";

const queryData = async filters => {
  let res = await fetch(`${url}${queryString.stringify(filters)}`);
  res = await res.json();

  return res;
};

exports.queryData = queryData;
