class Sector {
  constructor(polygon) {
    this.polygon = polygon;
    this.area = 0;
    this.verts = this.polygon._latlngs[0];
    for (let i = 1; i <= (this.verts.length - 2); i += 1) {
      const triangle = [this.verts[0], this.verts[i], this.verts[i + 1]];
      console.log(triangle);
    }
  }
}

export default Sector;