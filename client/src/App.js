import Map from "./components/Map";
import React, { Component } from "react";
import "./App.css";
import Categories from "./components/Categories";
import queryString from "query-string";

class App extends Component {
  filters = {};

  getByCategory = async ({ code }) => {
    this.filters.category = code;
    const queryAsString = queryString.stringify(this.filters);
    const { results } = await (await fetch(`/api/query?${queryAsString}`)).json();
    console.log(results);
  };

  render() {
    return (
      <div className="App">
        <Categories onSelect={this.getByCategory} />
        <Map />
      </div>
    );
  }
}

export default App;
