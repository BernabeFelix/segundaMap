import GoogleMapReact from "google-map-react";
import React from "react";

class AnyReactComponent extends React.Component {
  render() {
    return (
      <div style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "green" }}>
        Pointer
      </div>
    );
  }
}

class Map extends React.Component {
  static defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 11
  };

  render() {
    return (
      <GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
        <AnyReactComponent lat={59.955413} lng={30.337844} text="Kreyser Avrora" />
      </GoogleMapReact>
    );
  }
}

export default Map;
