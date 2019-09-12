import Home from "./home/home";
import Artwork from "./artworks/Artwork";
import Artist from "./artists/Artist";

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
    path: "/profile/details/:artist_un",
    component: Artist
  },
  {
    path: "/",
    component: Home
  },

];

export default routes;
