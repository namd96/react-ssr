import express from "express";
import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from "serialize-javascript";
import routes from "../shared/routes";
import App from "../shared/App";
import sourceMapSupport from "source-map-support";

if (process.env.NODE_ENV === "development") {
  sourceMapSupport.install();
}

const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("/api/news", (req, res) => {
  res.json(
    [
      {
        id: 1,
        artwork_id: 'debora-4423',
        upvotes: 257,
        title: "Debora Namrata won the Foosball with Joey",
        author: "RubeusH",
        date: new Date(Date.now() - 15000000)
      },
      {
        id: 2,
        artwork_id: 'mother-s-love-3',
        upvotes: 221,
        title: "mother-s-love-3 Untransfiguration classes to become compulsory at Hogwarts",
        author: "Baddock",
        date: new Date(Date.now() - 45000000)
      }
    ]);
});

const Path = require('path-parser').default
app.get("*", (req, res, next) => {

  const activeRoute = routes.find(route => matchPath(req.url.split('?')[0], route));
  console.log({ activeRoute, url: req.url })

  const pathParamsMatcher = new Path(activeRoute.path)
  req.params = pathParamsMatcher.test(req.url);
  console.log("req.params ", req.params, req.query)

  const requestInitialData =
    activeRoute.component.requestInitialData && activeRoute.component.requestInitialData(req);


  Promise.resolve(requestInitialData)
    .then(initialData => {
      console.log({ initialData });
      const context = { initialData };
      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      );

      res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>W Combinator</title>
          <link rel="stylesheet" href="/css/main.css">
          <script src="/bundle.js" defer></script>
          <script>window.__initialData__ = ${serialize(initialData)}</script>
        </head>

        <body>
          <div id="root">${markup}</div>
        </body>
      </html>
      `);
    })
    .catch(next);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});