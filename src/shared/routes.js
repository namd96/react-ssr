import News from "./news/News";
import Artwork from "./artworks/Artwork";

const routes = [
  // {
  //   path: "/",
  //   exact: true,
  //   component: Home
  // },
  {
    path: "/product/details/:artwork_id",
    component: Artwork
  },
  {
    path: "/",
    component: News
  },

];

export default routes;
