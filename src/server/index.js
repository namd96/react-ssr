import express from "express";
import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from "serialize-javascript";
import routes from "../shared/routes";
import App from "../shared/App";
import sourceMapSupport from "source-map-support";
import Helmet from 'react-helmet';

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
        title: "mother-s-love-3 Untransfiguration classes to become compulsory at Hogwartscd",
        author: "Baddock",
        date: new Date(Date.now() - 45000000)
      },
      {
        id: 3,
        artist_un: 'suraj1',
        upvotes: 221,
        title: " suraj1 Untransfiguration classes to become compulsory at Hogwartc",
        author: "Baddock",
        date: new Date(Date.now() - 45000000)
      },

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
      // console.log( "look",activeRoute);
      const context = { initialData };
      //  console.log("here", initialData)

      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      );
      const data = initialData.data ? initialData.data.data : false;
      var title = "";
      var description = "";
      var image = "";
      if (activeRoute.path == '/product/details/:artwork_id') {
        title = data ? data[0].artwork.title || data[0].artwork.old_title : "YMP"
        description = data ? data[0].artwork.description : "YMP"
        image = data ? data[0].artwork.img1 : "YMP"
        //  console.log("i am artwork", description)


      }
      else if (activeRoute.path == '/profile/details/:artist_un') {
        //  console.log("i am artist")
        title = data ? data.length ? data[0].user_profile.display_name || data[0].user_profile.old_display_name : data.user_profile.display_name || data.user_profile.old_display_name : "YMP"
        description = data ? data.length ? data[0].user_profile.bio : data.user_profile.bio : "YMP"
        image = data ? data.length ? data[0].user_profile.image : data.user_profile.image : "YMP"
      }
      res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <meta name="description" 
                      content=${serialize(description)}  />
                    <meta property="og:image" content=${image}></meta> 

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

console.log("PORT IN ENV IS =  ", process.env.PORT)
app.listen(3050, () => {
  console.log("Server is listening");
});