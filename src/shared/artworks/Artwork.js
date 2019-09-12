import React, { Component } from "react";
import "isomorphic-fetch";
import Helmet from 'react-helmet';

class Artwork extends Component {
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
            Artwork.requestInitialData().then(data => this.setState({ initialArtwork: data }));
        }
    }

    static requestInitialData(req) {
        console.log("req.params.artwork_id = ", req.params.artwork_id)
        return fetch("https://v4.yourmasterpieces.in/api/v1/products/artwork/url/" + req.params.artwork_id)
            // return fetch("http://127.0.0.1:3000/api/artwork")
            .then(response => response.json())
            .then(response => {
                console.log("yolo [requestInitialData] mkmkm - ", response);
                return response
            })
            .catch(error => console.log(error));
    }

    render() {
        const artwork = this.state.initialArtwork.data.data;
        return <div className="news-item">
            <Helmet>
                <title>{(artwork) ?
                    artwork.length ? artwork[0].artwork.title
                        || artwork[0].artwork.old_title : artwork.artwork.title
                        || artwork.artwork.old_title : "YourMasterpieces"}</title>

                <meta name="description"
                    content={`Artist on YourMasterpieces | ${(artwork) ? (artwork.length) ? artwork[0].artwork.description : artwork.artwork.description : ""} `} />

                <meta property="og:image" content={(artwork) ? (artwork.length) ? artwork[0].artwork.img1 : artwork.artwork.img1 : ""}></meta>
            </Helmet>
            <p>
                <span className="news-position">. ▲</span> {(artwork) ?
                    artwork.length ? artwork[0].artwork.title
                        || artwork[0].artwork.old_title : artwork.artwork.title
                        || artwork.artwork.old_title : ""}{" "}
                <small>{(artwork) ? (artwork.length) ? artwork[0].artwork.description : artwork.artwork.description : ""}</small>
                {/* state = {JSON.stringify(artwork)} */}
            </p>
                 <a href={'/product/details/'+(artwork) ? (artwork.length) ? artwork[0].artwork.url_slug : artwork.artwork.url_slug : ""}><img
                 style={{height : "150px" , width : "150px"}}
                 src={(artwork) ? (artwork.length) ? artwork[0].artwork.img1 : artwork.artwork.img1 : ""}/></a>   
        </div>;
    }
}

export default Artwork;