import React, { Component } from "react";
import "isomorphic-fetch";

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
        return fetch("https://dev.sharmeensahibole.com/api/v1/products/artwork/url/" + req.params.artwork_id)
            // return fetch("http://127.0.0.1:3000/api/artwork")
            .then(response => response.json())
            .then(response => {
                console.log("yolo [requestInitialData] - ", response);
                return response
            })
            .catch(error => console.log(error));
    }

    render() {
        const artwork = this.state.initialArtwork;
        return <div>
            state = {JSON.stringify(artwork)}
        </div>;
    }
}

export default Artwork;
