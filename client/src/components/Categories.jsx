import React from "react";

const Category = ({ value: { categories, label } }) => (
  <div>
    <h2>{label}</h2>
    <div>{categories.map((c, i) => <div key={i}>{c.label}</div>)}</div>
  </div>
);

class Categories extends React.Component {
  state = {
    categories: []
  };

  async componentDidMount() {
    const { categories } = await (await fetch("/api/categories")).json();

    this.setState({ categories });
  }

  render() {
    return (
      <div>
        <h1>Categories</h1>
        <div>{this.state.categories.map(c => <Category value={c} key={c.code} />)}</div>
      </div>
    );
  }
}

export default Categories;
