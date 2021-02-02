import React, { Component, Fragment, useState } from 'react';
import { MapContainer, Circle, TileLayer, Marker, Popup, ImageOverlay, useMap, useMapEvent, Polyline, Polygon } from 'react-leaflet';
import { CRS } from 'leaflet';
import Button from '@material-ui/core/Button';
import CreateBtn from './UI/btnCreate.jsx';
import polygonArea from '../Lib/polygonArea.ts';
import CreateIcon from '@material-ui/icons/Create';
import '../../assets/maps/gf.jpg';


(new Image(1, 1)).src = '../../assets/maps/gf.jpg';

function ClickEvent(props) {
  const map = useMap();
  useMapEvent('click', (e) => {
    const newBnt = document.querySelector('#new-lot');
    console.log(newBnt);
    if (newBnt) {
      if (newBnt.contains(e.originalEvent.target)) {
        console.log('changing class')
        console.log(props.drawMode);
        if (props.drawMode) {
          map._container.classList.remove('cursor-crosshair');
          map._container.querySelectorAll('path').forEach((itm) => itm.classList.remove('cursor-crosshair'));
        } else {
          map._container.classList.add('cursor-crosshair');
          map._container.querySelectorAll('path').forEach((itm) => itm.classList.add('cursor-crosshair'));
        }
      }
    }
    props.onClick(e)
  })
  return null
}

function MouseMoveEvent(props) {
  const map = useMap();
  useMapEvent('mousemove', (e) => {
    props.onMouseMove(e)
  })
  return null
}


function KeyEvent(props) {
  const map = useMap();
  useMapEvent('keydown', (e) => {
    props.onKeyPress(e);
    map._container.classList.remove('cursor-crosshair');
    map._container.querySelectorAll('path').forEach((itm) => itm.classList.remove('cursor-crosshair'));
  })
  return null
}

function MapController(props) {
  const map = useMap();
  const bounds = [[0, 0], [729, 1300]];
  const [pts, setPts] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [drawMode, setDrawMode] = useState(0);
  const [selectedId, setSelectedId] = useState(undefined);
  const onPolygonSelected = (idx) => {
    console.log('selected');
    console.log(idx);
    console.log(setSelectedId(idx));
    props.onPolygonSelected(idx);
  }

  const drawModeOn = () => {
    setDrawMode(1);
    map._container.classList.add('cursor-crosshair');
    map._container.querySelectorAll('path').forEach((itm) => itm.classList.add('cursor-crosshair'));
  }

  const drawModeOff = () => {
    setPts([]);
    setDrawMode(0);
    map._container.classList.remove('cursor-crosshair');
    map._container.querySelectorAll('path').forEach((itm) => itm.classList.remove('cursor-crosshair'));
  }

  const closePLine = () => {
      pts.pop();
      props.onPolygonAdd(pts);
  }

  useMapEvent('click', (e) => {
    console.log('click');
    if (drawMode) {
      let newPts = pts.slice();
      if (pts.length) {
        newPts.splice(-1, 0, [e.latlng.lat, e.latlng.lng]);
      } else {
        newPts.push([e.latlng.lat, e.latlng.lng])
      }
      setPts(newPts);
      console.log(newPts);
    }
  })

  useMapEvent('mousemove', (e) => {
    if (drawMode) {
      let newPts = pts.slice();
      if (pts.length) {
        newPts[newPts.length - 1] = [e.latlng.lat, e.latlng.lng]
      }
      else {
        newPts.push([e.latlng.lat, e.latlng.lng])
      }
      setPts(newPts);
    }
  })

  useMapEvent('keydown', (e) => {
    if (e.originalEvent.code === 'Enter') {
      closePLine();
      drawModeOff();
    }
    console.log(e.originalEvent.code);
  })


  return <Fragment>
    <ImageOverlay
      bounds={bounds}
      url="/assets/maps/gf.jpg"
      zIndex={0}
    />
    {
      props.lots.map((itm, idx) => {
        return <Polygon pathOptions={{ color: (props.selectedPolygonId === idx) ? 'blue' : 'SlateGray', fillColor: 'LightSlateGray' }} positions={itm.geometry.coordinates} key={idx}
          eventHandlers={{
            click: () => (drawMode) ? null : onPolygonSelected(idx),
          }}
        />
      })
    }
    <Polyline className='cursor-crosshair' positions={[pts]} />
    <div className='leaflet-top leaflet-right'>
      <div className="leaflet-control">
        {(drawMode) ?
          <Button variant="contained" onClick={drawModeOff} id={'new-lot'}>Cancel</Button> :
          <Button color='primary' variant="contained" onClick={drawModeOn} startIcon={<CreateIcon />} id={'new-lot'}>New lot</Button>}
      </div>
    </div>
  </Fragment>
}

function Map(props) {
  const bounds = [[0, 0], [729, 1300]];
  return <MapContainer className='map' bounds={bounds} crs={CRS.Simple} >
    <MapController bounds={bounds} {...props} />
  </MapContainer>
}
/* 
class Map extends Component {
  constructor() {
    super();
    this.bounds = [[0, 0], [729, 1300]];
    //this.state.pline = [];
    this.state = {
      pts: [],
      polygons: [],
      drawMode: 0,
      selectedId: undefined,
      polygonClass: null
    };
    this.drawModeOn = this.drawModeOn.bind(this);
    this.drawModeOff = this.drawModeOff.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    //this.onPolygonSelected = this.onPolygonSelected.bind(this);
  }
  onPolygonSelected(idx) {
    console.log('selected');
    console.log(idx);
    console.log(this.state.selectedId === idx);
    this.props.onPolygonSelected(idx);
  }
  drawModeOn() {
    this.setState({
      drawMode: 1,
      polygonClass: 'cursor-crosshair'
    })
  }
  drawModeOff() {
    this.setState({
      drawMode: 0,
      pts: [],
      mousePos: [],
    })
  }
  onClick(e) {
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
    const map = useMap();
    if(e.originalEvent.code==='Enter'){
          this.closePLine();
    this.drawModeOff();
    }
    console.log(e.originalEvent.code);

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
    return <MapContainer className='map' bounds={this.bounds} crs={CRS.Simple} >
      <ImageOverlay
        bounds={[[0, 0], [729, 1300]]}
        url="/assets/maps/gf.jpg"
        zIndex={0}
      />
      {this.props.lots.map((itm, idx) => {
        //console.log(this.state.polygonClass);
        return <Polygon pathOptions={{ color: (this.props.selectedPolygonId === idx) ? 'blue' : 'SlateGray', fillColor: 'LightSlateGray' }} positions={itm.geometry.coordinates} key={idx} className={this.state.polygonClass}
          eventHandlers={{
            click: () => (this.state.drawMode) ? null : this.onPolygonSelected(idx),
          }}
        />
      })}
      <Polyline className='cursor-crosshair' positions={[this.state.pts]} />
      <div className='leaflet-top leaflet-right'>
        <div className="leaflet-control">
          {(this.state.drawMode) ?
            <Button variant="contained" onClick={this.drawModeOff} id={'new-lot'}>Cancel</Button> :
            <Button color='primary' variant="contained" onClick={this.drawModeOn} startIcon={<CreateIcon />} id={'new-lot'}>New lot</Button>}
        </div>
      </div>
      <ClickEvent onClick={this.onClick} drawMode={this.state.drawMode} />
      <KeyEvent onKeyPress={this.onKeyPress} />
      <MouseMoveEvent onMouseMove={this.onMouseMove} drawMode={this.state.drawMode} />
    </MapContainer>
  }
}
 */
export default Map;
