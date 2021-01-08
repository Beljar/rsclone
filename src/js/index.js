import PolygonHelper from './polygonHelper';
import Sector from './sector';
import 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../style/style.scss';
//import html from '../index.html';

const main = () => {


  const map = L.map('map', {
    crs: L.CRS.Simple
  });
  const polygonHelper = new PolygonHelper(map);
  const mapEl = document.querySelector('#map');
  var bounds = [[0, 0], [729, 1300]];
  var image = L.imageOverlay('/src/assets/maps/gf.jpg', bounds).addTo(map);
  map.fitBounds(bounds);
  const debug = {};
  debug.lat = document.querySelector('.debug__lat');
  debug.lng = document.querySelector('.debug__lng');
  debug.pt = document.querySelector('#debug__pt');
  debug.ln = document.querySelector('#debug__ln');
  map.on('mousemove', (e) => {
    debug.lat.innerText = e.latlng.lat;
    debug.lng.innerText = e.latlng.lng;
  })
  const drawPt = (latlng) => {
    L.circleMarker(latlng, { radius: 2 }).addTo(map);
  }
  const drawPtByEvent = (e) => {
    drawPt(e.latlng);
  }
  const listeners = new Set([]);

  debug.pt.addEventListener('click', () => {
    if (listeners.has(drawPtByEvent)) {
      map.off('click', drawPtByEvent);
      listeners.delete(drawPtByEvent);
      mapEl.classList.remove('cursor-crosshair');
    } else {
      map.on('click', drawPtByEvent);
      listeners.add(drawPtByEvent);
      mapEl.classList.add('cursor-crosshair');
    }
    console.log(listeners);
  });
  const highlightFeature = (e) => {
  console.log(e.target);
  }
  const resetHighlight = (e) => {
    console.log('out');
    console.log(e.target);
    }
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: () => console.log('click')
    });
  }
let id = 0;
  const stopPolylineHelper = (e) => {
    if (e.originalEvent.code === 'Enter') {
      //const sector = new Sector();
      const sector = new Sector({pts: polygonHelper.stop()});
      console.log(sector);
      L.geoJSON(sector, {onEachFeature}).addTo(map);
    }
  }
  debug.ln.addEventListener('click', () => {
    polygonHelper.start();
    map.on('keydown', stopPolylineHelper);
  })
}

document.addEventListener('DOMContentLoaded', main);