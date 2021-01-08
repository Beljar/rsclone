class PolygonHelper {
  constructor(map) {
    this.map = map;
    this.pts = [];
    this.mapPln;
    this.curLatlng;
    this.polygon;
    this.mapEl = document.querySelector('#map');
    this.drawLn = this.drawLn.bind(this);
    this.previewLn = this.previewLn.bind(this);
  }
  start() {
    console.log(L);
    this.map.on('click', this.drawLn);
    this.map.on('mousemove', this.previewLn);
    this.mapEl.classList.add('cursor-crosshair');
    this.mapPln = L.polyline(this.pts, { 'className': 'cursor-crosshair' }).addTo(this.map);
  }
  drawLn(e) {
    console.log(e);
    this.pts.push(e.latlng);
    this.map.removeLayer(this.mapPln);
    this.curLatlng = e.latlng;
    this.mapPln = L.polyline(this.pts).addTo(this.map);
    console.log(this.mapPln);
  }
  stop() {
    //ln.push(ln[0]);
    //L.polyline(ln).addTo(map);
    this.map.removeLayer(this.mapPln);
    this.map.off('click', this.drawLn);
    this.map.off('mousemove', this.previewLn);
    //listeners.delete(drawLn);
    this.mapEl.classList.remove('cursor-crosshair');
    const polygon = L.polygon(this.pts, { color: 'red' }).addTo(this.map);
    this.pts = [];
    console.log(polygon._latlngs[0]);
    return polygon;

  }
  previewLn = (e) => {
    this.map.removeLayer(this.mapPln);
    this.mapPln = L.polyline(this.pts.concat([e.latlng]), { 'className': 'cursor-crosshair' }).addTo(this.map);
  }
}

export default PolygonHelper;