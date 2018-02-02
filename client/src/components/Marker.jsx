import React from "react";

class Marker extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <div style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "green" }}>
        {title}
      </div>
    );
  }
}

export default Marker;
