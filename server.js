const express = require("express");
const history = require("connect-history-api-fallback");

const app = express();
const port = process.env.PORT || 5051;

// Middleware for serving '/dist' directory
const oneDay = 24 * 60 * 60 * 1000; // must be in milliseconds...
const oneWeek = oneDay * 7;
const oneYear = oneWeek * 52;
const staticOpts = { maxAge: oneYear };
const staticFileMiddleware = express.static("dist", staticOpts);

// 1st call for unredirected requests
app.use(staticFileMiddleware);

// Support history api
app.use(history());

// 2nd call for redirected requests
app.use(staticFileMiddleware);

app.listen(port, function () {
  console.log("Server started on port " + port);
});
