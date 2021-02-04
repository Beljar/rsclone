import React, { Component, Fragment, useState } from 'react';
import { MapContainer, ImageOverlay, useMap, useMapEvent, Polyline, Polygon } from 'react-leaflet';
import { CRS } from 'leaflet';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import '../../assets/maps/gf.jpg';
import { distance } from '../Lib/geometry.ts';

const tolerance = 5;

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
      if (pts.length){
      if (pts.length > 2) {
        const lastPt = [e.latlng.lat, e.latlng.lng];
        console.log(lastPt, pts[0]);
        const dist = distance(lastPt, pts[0]);
        console.log(dist);
        if (dist < tolerance) {
          closePLine();
          drawModeOff();
          return
        }
      } 
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
    if (e.originalEvent.code === 'Escape') {
      drawModeOff();
    }
    console.log(e.originalEvent.code);
  })

  console.log(props.selectedPolygonId !== null);
  return <Fragment>
    <ImageOverlay
      bounds={bounds}
      url="/assets/maps/gf.jpg"
      zIndex={0}
    />
    {
      props.lots.map((itm, idx) => {
        if (props.selectedPolygonId !== idx) {
          return <Polygon
            pathOptions={{
              color: (props.selectedPolygonId === idx) ? 'blue' : 'SlateGray',
              fillColor: (itm.occupied) ? 'purple' : 'LightSlateGray'
            }}
            positions={itm.geometry.coordinates} key={idx}
            eventHandlers={{
              click: () => (drawMode) ? null : onPolygonSelected(idx),
            }}
          />
        }
      })
    }
    {(props.selectedPolygonId !== null) ? <Polygon
      pathOptions={{
        color: 'blue',
        fillColor: (props.lots[props.selectedPolygonId].occupied) ? 'purple' : 'LightSlateGray'
      }}
      positions={props.lots[props.selectedPolygonId].geometry.coordinates} key={props.selectedPolygonId}
    /> : null}
    <Polyline className='cursor-crosshair' positions={[pts]} />
    <div className='leaflet-top leaflet-right'>
      <div className="leaflet-control">
        {(drawMode) ?
          <Button variant="contained" onClick={drawModeOff} id={'new-lot'}>Cancel</Button> :
          <Button color='primary' variant="contained" onClick={drawModeOn} startIcon={<CreateIcon />} id={'new-lot'}>New lot</Button>}
      </div>
    </div>
    {(pts.length > 3) ? <div className='map__hint-container'>
      <div className='map__hint'>press 'Enter' to close line</div>
    </div> : null}
    {(drawMode) ? <div className='map__hint-container'>
      <div className='map__hint'>press 'Esc' to cancel</div>
    </div> : null}


  </Fragment>
}

function Map(props) {
  const bounds = [[0, 0], [729, 1300]];
  return <MapContainer className='map' bounds={bounds} crs={CRS.Simple} >
    <MapController bounds={bounds} {...props} />
  </MapContainer>
}

export default Map;
