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
  water: boolean;
  tenantUUID: string;
  price: number;
}

class Lot {
  uuid: string;
  name: string;
  area: number;
  water: boolean;
  tenantUUID: string;
  geometry: GeometryInterface;
  price: number;
  constructor(
    { uuid = uuidv4(), name = null, area, water = false, tenantUUID = null, geometry, price = 0 }: LotInterface
  ) {
    this.uuid = uuid;
    this.name = name;
    this.area = area;
    this.water = water;
    this.geometry = geometry;
    this.tenantUUID = tenantUUID;
    this.price = price;
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
    console.log('cloning');
    const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    console.log(clone);
    return clone;
  }
}

export default Lot;