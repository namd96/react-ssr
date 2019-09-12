import React, { Component } from "react";
import ArtworkList from "./artworkList";
import "isomorphic-fetch";

class News extends Component {
  constructor(props) {
    super(props);
   
    let initialData;
    if (__isBrowser__) {
      initialData = window.__initialData__;
      delete window.__initialData__;
    } else {
      initialData = props.staticContext.initialData;
    }

    this.state = { news: initialData };
  }

  componentDidMount() {
    if (!this.state.news) {
      News.requestInitialData().then(data => this.setState({ news: data }));
    }
  }

  static requestInitialData() {
    return fetch("https://v4.yourmasterpieces.in/api/v1/products/artworks/public/pick/?limit=200&offset=0&search=Featured",
    { 
      method: 'get', 
      headers: new Headers({
        'Authorization': 'pyc4i1TjeauQM9sGXd23j7RXiDsb3AYv', 
        // 'Content-Type': 'application/x-www-form-urlencoded'
      })
    }
    )
      .then(response =>  response.json())
      .catch(error => console.log(error));
  }

  render() {
    const { news } = this.state;
    return <ArtworkList Artworkdata={news} />;
  }
}

export default News;
