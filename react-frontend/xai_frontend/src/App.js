import React from "react";
import ReactDOM from "react-dom";

const API = val => {
  return new Promise(res => {
    setTimeout(res.bind(null, val), 2000);
  });
};

const Fetch = () => {
  return API("http://127.0.0.1:5000/image");
};

class App extends React.Component {
  state = {
    image: "",
    loading: true
  };

  componentDidMount() {
    Fetch().then(image => {
      this.setState({ image, loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return <h1>loading</h1>;
    }

    return <img src={this.state.image} alt="" />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


export default App;