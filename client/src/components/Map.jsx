import Marker from "./Marker";
import GoogleMapReact from "google-map-react";
import React from "react";

class Map extends React.Component {
  static defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    markers: [],
    zoom: 11
  };

  Geocoder;
  state = {
    geocodedMarkers: []
  };

  componentDidUpdate() {
    if (this.props.markers && !this.state.geocodedMarkers.length && this.Geocoder) {
      this.geocodeMarkers();
    }
  }

  initGeocoder = ({ _, maps }) => {
    this.Geocoder = new maps.Geocoder();

    if (this.props.markers.length) this.geocodeMarkers();
  };

  geocodeMarkers() {
    this.props.markers.forEach(marker => {
      this.Geocoder.geocode({ address: marker.location }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          this.setState(prevState => ({
            geocodedMarkers: [
              ...prevState.geocodedMarkers,
              {
                ...marker,
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              }
            ]
          }));
        }
      });
    });
  }

  render() {
    const { geocodedMarkers } = this.state;

    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        onGoogleApiLoaded={this.initGeocoder}
      >
        {geocodedMarkers.map(marker => <Marker {...marker} key={marker.title} />)}
      </GoogleMapReact>
    );
  }
}

export default Map;
