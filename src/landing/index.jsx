import React from "react";
import mapboxgl from "mapbox-gl";
import {MAPBOX_TOKEN, ROUTES} from "../utils/constants.js";

import { Icon } from '@iconify/react';
import Sidebar from "./sidebar.jsx";
import {Link} from "react-router-dom";

mapboxgl.accessToken = MAPBOX_TOKEN;

class LandingPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lat: 12.977529081680132,
      lng: 77.57247169985196,
      zoom: 11,
      supported: mapboxgl.supported(),
    };
    this.mapContainer = React.createRef();
  }

  initMap = () => {
    if(!this.mapContainer.current) {
      return;
    }
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      minZoom: 10,
      maxZoom: 18,
    });
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
    this.map = map;
  };

  componentDidMount() {
    if (this.state.supported) {
      this.initMap();
      this.map?.on("load", () => {

      });
    }
  }

  componentWillUnmount() {
    this.map?.remove();
  }

  render() {
    return (
      <>
        <div id="map" ref={this.mapContainer} className="map-container" />
        <Sidebar />
        <div id="landing-bottom">
          <Link id="landing-input" to={ROUTES.search}>
            <Icon icon="iconamoon:search-bold" color="#FFFFFF" width="16" height="16" />
            Where to?
          </Link>
          <div id="landing-icons">
            <button className="landing-button">
              <Icon icon="tabler:star-filled" color="#FFD027" width="16" height="16" />
            </button>
            <button className="landing-button">
              <Icon icon="tabler:current-location" color="#FFFFFF" width="22" height="22" />
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default LandingPage;
