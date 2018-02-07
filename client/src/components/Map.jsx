import Marker from "./Marker";
import GoogleMapReact from "google-map-react";
import React from "react";

class Map extends React.Component {
  static defaultProps = {
    markers: []
  };

  map;
  Geocoder;
  state = {
    center: [0, 0],
    geocodedMarkers: [],
    zoom: 5
  };

  componentDidUpdate({ markers }) {
    if (markers !== this.props.markers && this.Geocoder) {
      this.geocodeMarkers();
    }
  }

  centerMap = () => {
    const address = "mexico";

    this.Geocoder.geocode({ address }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        this.setState({
          center: {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          }
        });
      }
    });
  };

  initGeocoder = ({ map, maps }) => {
    this.Geocoder = new maps.Geocoder();
    this.map = map;

    this.centerMap();

    if (this.props.markers.length && !this.state.geocodedMarkers.length) this.geocodeMarkers();
  };

  geocodeMarkers() {
    // clean state before anything
    this.setState({ geocodedMarkers: [] }, () => {
      const bounds = new window.google.maps.LatLngBounds();

      this.props.markers.forEach(marker => {
        this.Geocoder.geocode({ address: marker.location }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();

            // update center and zoom
            bounds.extend(new window.google.maps.LatLng(lat, lng));
            this.map.fitBounds(bounds);

            // update geocoded markers
            this.setState(prevState => ({
              geocodedMarkers: [
                ...prevState.geocodedMarkers,
                {
                  ...marker,
                  lat,
                  lng
                }
              ]
            }));
          }
        });
      });
    });
  }

  render() {
    const { geocodedMarkers } = this.state;

    return (
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals={true}
        center={this.state.center}
        defaultZoom={this.state.zoom}
        onGoogleApiLoaded={this.initGeocoder}
      >
        {geocodedMarkers.map(marker => <Marker {...marker} key={marker.title} />)}
      </GoogleMapReact>
    );
  }
}

export default Map;
