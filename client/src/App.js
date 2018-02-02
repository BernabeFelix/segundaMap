import Map from "./components/Map";
import React, { Component } from "react";
import "./App.css";
import Categories from "./components/Categories";
import queryString from "query-string";

class App extends Component {
  state = {
    markers: []
  };
  filters = {};

  getByCategory = async ({ code }) => {
    this.filters.category = code;
    const queryAsString = queryString.stringify(this.filters);
    const markers = await (await fetch(`/api/query?${queryAsString}`)).json();
    this.setState({ markers });
  };

  render() {
    return (
      <div className="App">
        <Categories onSelect={this.getByCategory} />
        <Map markers={this.state.markers} />
      </div>
    );
  }
}

export default App;
