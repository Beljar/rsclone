import React, { Component, Fragment } from 'react';
import { MapContainer, Circle, TileLayer, Marker, Popup, ImageOverlay, useMap, useMapEvents, Polyline } from 'react-leaflet';
import { CRS } from 'leaflet';

function ClickHandle(props) {
  console.log(props);
  useMapEvents({
    click: (e) => {
      props.onClick(e);

    }
  });
  return <Polyline positions={props.pts} />;
}

class Map extends Component {
  constructor() {
    super();
    this.bounds = [[0, 0], [729, 1300]];
    //this.state.pline = [];
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return <MapContainer className="map" bounds={this.bounds} crs={CRS.Simple} onClick={(e) => this.props.onClick(e)}>
      <ImageOverlay
        className='overlay'
        bounds={[[0, 0], [729, 1300]]}
        url="/src/assets/maps/gf.jpg"
        zIndex={0}
      />

      <ClickHandle onClick={this.props.onClick} pts={this.props.pts} />
    </MapContainer>
  }
}

export default Map;
