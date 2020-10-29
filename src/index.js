import React from "react";
import { render } from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = { gifUrlList: [] };
  }

  // メソッドの実行　ライフサイクルメソッド
  componentDidMount() {
    this.giphyApi();
  }

  renderImageList(list) {
    const imageList = list.map((url) => {
      return (
        <li>
          <img src={url} />
        </li>
      );
    });
    return <ul>{imageList}</ul>;
  }

  render() {
    console.log(this.state.gifUrlList);
    return <div>{this.renderImageList(this.state.gifUrlList)}</div>;
  }

  giphyApi() {
    const search = "cat";
    const key = "kDfPv4LBhui4UHt8t8KydiqaX1Yi0mrG";
    const limit = 10;

    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`;

    axios.get(url).then((res) => {
      const data = res.data.data;
      const imageUrlList = data.map((item) => item.images.downsized.url);
      this.setState({ gifUrlList: imageUrlList });

      // const img = document.createElement("img");
      // img.src = imageUrl;
      // document.body.appendChild(img);
    });
  }
}

render(<App />, document.getElementById("root"));
