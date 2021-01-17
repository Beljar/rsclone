import React, { Component, Fragment } from 'react';
import { MapContainer, Circle, TileLayer, Marker, Popup, ImageOverlay, useMap, useMapEvent, Polyline, Polygon } from 'react-leaflet';
import { CRS } from 'leaflet';
import Btn from './btn.jsx';
import CreateBtn from './btnCreate.jsx';
import polygonArea from './polygonArea.ts';

function ClickEvent(props) {
  useMapEvent('click', props.onClick)
  return null
}

function MouseMoveEvent(props) {
  const map = useMap();
  console.log(map);
  useMapEvent('mousemove', (e) => {
    if (props.drawMode) {
      map._container.classList.add('cursor-crosshair');
    } else {
      map._container.classList.remove('cursor-crosshair');
    }
    props.onMouseMove(e)
  })
  return null
}

function KeyEvent(props) {
  useMapEvent('keydown', props.onKeyPress)
  return null
}

class Map extends Component {
  constructor() {
    super();
    this.bounds = [[0, 0], [729, 1300]];
    //this.state.pline = [];
    this.state = {
      pts: [],
      polygons: [],
      drawMode: 0,
      selectedId: undefined
    };
    this.drawControlParams =
    {
      0: {
        text: 'New lot',
        onClick: this.drawModeOn.bind(this),
      },
      1: {
        text: 'Cancel',
        onClick: this.drawModeOff.bind(this),
      },
    }

    this.onClick = this.onClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    //this.onPolygonSelected = this.onPolygonSelected.bind(this);
  }
  onPolygonSelected(idx) {
    console.log('selected');

    console.log(idx);
    /*     this.setState(
          {selectedId: idx}
        ) */
    console.log(this.state.selectedId === idx);
    this.props.onPolygonSelected(idx);
  }
  drawModeToggle() {

  }
  drawModeOn() {
    this.setState({
      drawMode: 1
    })
  }
  drawModeOff() {
    this.setState({
      drawMode: 0,
      pts: [],
      mousePos: [],
    })
  }
  getSnapshotBeforeUpdate() {
    console.log('update')
    console.log(this.props.polygons)
  }
  onClick(e) {
    console.log(e);
    console.log(this.state.drawMode);
    if (this.state.drawMode) {

      this.setState((state) => {
        const pts = state.pts;
        console.log(pts)
        if (pts.length) {
          pts.splice(-1, 0, [e.latlng.lat, e.latlng.lng]);
        } else {
          pts.push([e.latlng.lat, e.latlng.lng])
        }
        console.log(pts)
        return {
          pts
        }
      })
    }
    console.log(this.state);
  }
  onMouseMove(e) {
    if (this.state.drawMode) {
      this.setState((state) => {
        const pts = state.pts;
        if (pts.length) {
          pts[pts.length - 1] = [e.latlng.lat, e.latlng.lng]
        }
        else {
          pts.push([e.latlng.lat, e.latlng.lng])
        }
        return {
          pts
        }
      })
    }
  }
  onKeyPress(e) {
    console.log(e.originalEvent.code);
    this.closePLine();
    this.drawModeOff();
  }
  closePLine() {
    this.setState((state) => {
      const polygons = state.polygons;
      const pts = state.pts;
      //pts[pts.length - 1] = pts[0];
      pts.pop();
      polygons.push(pts);
      console.log(polygonArea(pts));
      this.props.onPolygonAdd(pts);
      return {
        polygons
      }
    }
    )
    console.log(this.state.polygons);
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    console.log('render map');
    console.log((this.state.drawMode) ? 'map cursor-crosshair' : "map");
    return <MapContainer className='map' bounds={this.bounds} crs={CRS.Simple} >
      <ImageOverlay
        bounds={[[0, 0], [729, 1300]]}
        url="/src/assets/maps/gf.jpg"
        zIndex={0}
      />
      {this.props.polygons.map((itm, idx) => {
        console.log('polygons')
        console.log(itm, (this.state.selectedId === idx) ? 'blue' : 'red');
        return <Polygon pathOptions={{ color: (this.props.selectedPolygonId === idx) ? 'blue' : 'SlateGray', fillColor: 'LightSlateGray' }} positions={itm} key={idx}
          eventHandlers={{
            click: () => (this.state.drawMode) ? null : this.onPolygonSelected(idx),
          }}

        />
      })}
      <Polyline positions={[this.state.pts]} />
      <div className='leaflet-top leaflet-right'>
        <div className="leaflet-control">
          {(this.state.drawMode) ? <Btn {...this.drawControlParams[this.state.drawMode]} /> : <CreateBtn {...this.drawControlParams[this.state.drawMode]} />}

        </div>
      </div>
      <ClickEvent onClick={this.onClick} />
      <KeyEvent onKeyPress={this.onKeyPress} />
      <MouseMoveEvent onMouseMove={this.onMouseMove} drawMode={this.state.drawMode} />
    </MapContainer>
  }
}

export default Map;
