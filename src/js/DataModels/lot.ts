import { v4 as uuidv4, v4 } from 'uuid';

interface GeometryInterface {
  coordinates: Array<Array<number>>;
  type: string;
}

interface LotInterface {
  uuid: string;
  name: string;
  geometry: GeometryInterface;
  area: number;
  tenantUUID: string;
}

class Lot {
  uuid: string;
  name: string;
  area: number;
  tenantUUID: string;
  geometry: GeometryInterface;
  constructor(
    { uuid = uuidv4(), name = null, area, tenantUUID = null, geometry }: LotInterface
  ) {
    this.uuid = uuid;
    this.name = name;
    this.area = area;
    this.geometry = geometry;
    this.tenantUUID = tenantUUID;
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
  clone() {
    return new Lot(
      {
        uuid: this.uuid,
        name: this.name,
        area: this.area,
        geometry: this.geometry,
        tenantUUID: this.tenantUUID
      }
    );
  }
}

export default Lot;