import React, { Component, Fragment, useState } from 'react';
import { MapContainer, ImageOverlay, useMap, useMapEvent, Polyline, Polygon } from 'react-leaflet';
import { CRS } from 'leaflet';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import '../../assets/maps/gf.jpg';

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

export default Map;
