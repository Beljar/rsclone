import { v4 as uuidv4 } from 'uuid';

class Sector {
  constructor({id = uuidv4(), pts = []} = {}) {
    this.id = id;
    this.type = 'Feature';
    this.area = 0;
    this.id = 0;
    this.geometry = {
      coordinates: pts,
      type: 'Polygon'
    }
    for (let i = 1; i <= (this.geometry.coordinates.length - 2); i += 1) {
      const triangle = [this.geometry.coordinates[0], this.geometry.coordinates[i], this.geometry.coordinates[i + 1]];
      console.log(triangle);
    }
  }
}

export default Sector;