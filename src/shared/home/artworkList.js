import React, { Component } from "react";
import timeAgo from "node-time-ago";
// import orderBy from "lodash.orderBy";
import w18 from "./w18.png";
import "./NewsList.css";

class NewsList extends Component {
  state = {
    sortOrder: "upvotes"
  };

  setOrder(order, event) {
    event.preventDefault();
    this.setState({ sortOrder: order });
  }

  render() {
    const Artworkdata = orderBy(this.props.Artworkdata, this.state.sortOrder, "desc");
      console.log("final",this.props.Artworkdata.data.data[0])
    return (
      <div className="newslist">
        {/* state = {JSON.stringify(this.props.Artworkdata.data.data[0].artwork.old_title)} */}

        {/*         <div className="header">
          <div className="header-title">
            <img src={w18} width="18" height="18" className="logo" />
            <strong>Wizard News</strong>
          </div>
          <div className="sort">
            Sort By:{" "}
            <a
              href={"#"}
              className={this.state.sortOrder === "upvotes" && "sort-selected"}
              onClick={this.setOrder.bind(this, "upvotes")}>
              Upvotes
            </a>|
            <a
              href="#"
              className={this.state.sortOrder === "date" && "sort-selected"}
              onClick={this.setOrder.bind(this, "date")}>
              Date
            </a>
          </div> */}

            {Artworkdata &&
              this.props.Artworkdata.data.data.map((post,idx) =>
                <div key={post.id} className="news-item">
                  <p>
                    <span className="news-position">{idx}. ▲</span> {post.artwork.title || post.artwork.old_title}{" "}
                    <small>( {post.artwork.description})</small>
                  </p>
                  <p>
                    <span className="news-position">
                      <a href={
                        !!post.artist_un ?  "/product/details/" + (post.artist_un || "test") :  "/product/details/" + (post.artwork.url_slug || "test")} >URL</a>
                      {/* <a href={"/product/details?artwork_id=" + (post.artwork_id || "test")} >URL</a> */}
                    </span>
                  </p>
                  <small className="news-details">
                  <a href={
                        !!post.artist_un ?  "/product/details/" + (post.artist_un || "test") :  "/product/details/" + (post.artwork.url_slug || "test")} >  <img style={{height : "50px" , width : "50px"}} src={post.artwork.img1}/></a>
                  </small>
                  <p>
                    <span className="news-position">{idx}. ▲</span> {post.artwork.user_profile.dispay_name || post.artwork.user_profile.old_display_name}{" "}
                    <small>( {post.artwork.description})</small>
                  </p>
                  <p>
                    <span className="news-position">
                      <a href={'/profile/details/' +
                         post.artwork.user_profile.share_url.substr(post.artwork.user_profile.share_url.lastIndexOf("/") + 1) } >URL</a>
                      {/* <a href={"/product/details?artwork_id=" + (post.artwork_id || "test")} >URL</a> */}
                    </span>
                  </p>
                  <small className="news-details">
                  <a href={'/profile/details/' +
                         post.artwork.user_profile.share_url.substr(post.artwork.user_profile.share_url.lastIndexOf("/") + 1) }>  <img style={{height : "50px" , width : "50px"}} src={post.artwork.user_profile.image}/></a>
                  </small>
                </div>
              )}


              </div>
      //     </div>
    );
  }
}

export default NewsList;
