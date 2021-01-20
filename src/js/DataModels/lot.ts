import { copyFile } from 'fs';
import { v4 as uuidv4, v4 } from 'uuid';

interface GeometryInterface {
  coordinates: Array<Array<number>>;
  type: string;
}

interface LotInterface {
  uuid: string;
  id: string;
  geometry: GeometryInterface;
  area: number;
}

class Lot {
  uuid:string;
  id:string;
  area:number;
  geometry:GeometryInterface;
  constructor(
    {uuid=uuidv4(), id=null, area, geometry}: LotInterface
  ) {
    this.uuid = uuid;
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
  clone(){
    return new Lot(
      {uuid:this.uuid,
      id:this.id,
      area:this.area,
      geometry:this.geometry}
    );
  }
}

export default Lot;