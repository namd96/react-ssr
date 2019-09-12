import React, { Component } from "react";
import "isomorphic-fetch";
import Helmet from 'react-helmet';

class Artist extends Component {
    constructor(props) {
        super(props);

        let initialArtwork;
        if (__isBrowser__) {
            initialArtwork = window.__initialData__;
            delete window.__initialData__;
        } else {
            initialArtwork = props.staticContext.initialData;
        }

        this.state = { initialArtwork } // this is an artowrk ;
    }

    componentDidMount() {
        if (!this.state) {
            Artist.requestInitialData().then(data => this.setState({ initialArtwork: data }));
        }
    }

    static requestInitialData(req) {
        console.log("req.params.artist_username = ", req.params.artist_un)
        return fetch("https://v4.yourmasterpieces.in/api/v1/profiles/user/url/" + req.params.artist_un + "?limit=200&offset=0")
            // return fetch("http://127.0.0.1:3000/api/artwork")
            .then(response => response.json())
            .then(response => {
                console.log("yolo [requestInitialData] mdkjsnc - ", response, req.params.artist_un);
                return response
            })
            .catch(error => console.log(error));
    }

    render() {
        const artwork = this.state.initialArtwork.data.data;
        return <div>
            {/* <Helmet>
                <title>{(artwork) ? artwork.length ? artwork[0].user_profile.display_name || artwork[0].user_profile.old_display_name : artwork.user_profile.display_name || artwork.user_profile.old_display_name : ""}</title>

                <meta name="description" content={`Artist on YourMasterpieces | ${(artwork) ? (artwork.length) ? artwork[0].user_profile.bio : artwork.user_profile.bio : ""} `} />

                <meta property="og:image" content={(artwork) ? (artwork.length) ? artwork[0].user_profile.image : artwork.user_profile.image : ""}></meta>
            </Helmet> */}
            {/* state = {JSON.stringify(artwork)} */}

            <div className="news-item">
                <p>
                    <span className="news-position">. ▲</span> {(artwork) ?
                        artwork.length ? artwork[0].user_profile.display_name ||
                            artwork[0].user_profile.old_display_name : artwork.user_profile.display_name ||
                            artwork.user_profile.old_display_name : ""}{" "}
                    <small>( {(artwork) ? artwork.length ?
                        artwork[0].user_profile.description : artwork.user_profile.description : ""})</small>
               
               <a href={"/profile/details/" + artwork ? artwork.length ? artwork[0].user_profile.share_url.substr(artwork[0].user_profile.share_url.lastIndexOf("/") + 1) 
               :  artwork.user_profile.share_url.substr(artwork.user_profile.share_url.lastIndexOf("/") + 1) : "" } >  <img style={{ height: "50px", width: "50px" }} src={artwork ? artwork.length  ? artwork[0].user_profile.image : artwork.user_profile.image : ""} /></a>
                </p>
                {artwork &&
                    artwork.map((post, idx) =>
                        <div key={post.id} className="news-item">
                            <p>
                                <span className="news-position">{idx}. ▲</span> {post.title || post.old_title}{" "}
                                <small>( {post.description})</small>
                            </p>
                            <p>
                                <span className="news-position">
                                    <a href={
                                        !!post.artist_un ? "/product/details/" + (post.artist_un || "test") : "/product/details/" + (post.url_slug || "test")} >URLasas</a>
                                    {/* <a href={"/product/details?artwork_id=" + (post.artwork_id || "test")} >URL</a> */}
                                </span>
                            </p>
                            <small className="news-details">
                                <a href={
                                    !!post.artist_un ? "/product/details/" + (post.artist_un || "test") : "/product/details/" + (post.url_slug || "test")} >  <img style={{ height: "50px", width: "50px" }} src={post.img1} /></a>
                            </small>
                        </div>
                    )}
            </div>
        </div>;
    }
}

export default Artist;
