import { ExpandLess, ExpandMore } from "material-ui-icons";
import List from "material-ui/es/List/List";
import ListItem from "material-ui/es/List/ListItem";
import ListItemText from "material-ui/es/List/ListItemText";
import Collapse from "material-ui/es/transitions/Collapse";
import React from "react";

const SubCategory = ({ subCategory, onClick }) => {
  const getSubCategory = () => onClick(subCategory);

  return <CustomListItem label={subCategory.label} onClick={getSubCategory} />;
};

const CustomListItem = ({ children, label, onClick = () => {} }) => (
  <ListItem button onClick={onClick}>
    <ListItemText inset primary={label} />
    {children}
  </ListItem>
);

class Category extends React.Component {
  state = {
    open: false
  };

  toggleOpen = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    const { onClick, value: { categories, label } } = this.props;
    const { open } = this.state;

    return (
      <div>
        <CustomListItem label={label} onClick={this.toggleOpen}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </CustomListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categories.map(subCategory => (
              <SubCategory subCategory={subCategory} key={subCategory.code} onClick={onClick} />
            ))}
          </List>
        </Collapse>
      </div>
    );
  }
}

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
      <List component="nav" subheader={<h1>Categories</h1>}>
        {this.state.categories.map(c => (
          <Category value={c} key={c.code} onClick={this.props.onSelect} />
        ))}
      </List>
    );
  }
}

export default Categories;
