import { v4 as uuidv4, v4 } from 'uuid';

interface GeometryInterface {
  coordinates: Array<Array<number>>;
  type: string;
}

interface LotInterface {
  id: string;
  geometry: GeometryInterface;
  area: number;
}

class Lot {
  id:string;
  area:number;
  geometry:GeometryInterface;
  constructor(
    {id=uuidv4(), area, geometry}: LotInterface
  ) {
    this.id = id;
    this.area = area;
    this.geometry = geometry;
    //this.type = 'Feature';
    //this.area = 0;
/*     this.geometry = {
      coordinates: pts,
      type: 'Polygon'
    }
    for (let i = 1; i <= (this.geometry.coordinates.length - 2); i += 1) {
      const triangle = [this.geometry.coordinates[0], this.geometry.coordinates[i], this.geometry.coordinates[i + 1]];
      console.log(triangle);
    } */
  }
}

export default Lot;