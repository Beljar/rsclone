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
  gas: boolean;
  tenantUUID: string;
  price: number;
  occupied: boolean;
  factArea: number;
  electicity: number;
  payPeriod: number;
}

class Lot {
  static payPeriods = {
    0: "Day",
    1: "Week",
    2: "Month",
    3: "Year"
  }
  uuid: string;
  name: string;
  area: number;
  factArea: number;
  water: boolean;
  gas: boolean;
  tenantUUID: string;
  geometry: GeometryInterface;
  price: number;
  occupied: boolean;
  electicity: number;
  payPeriod: number;
  constructor(
    { uuid = uuidv4(),
      name = null,
      area,
      water = false,
      gas = false,
      tenantUUID = null,
      geometry,
      price = 0,
      occupied = false,
      factArea = area,
      electicity = 0,
      payPeriod = 2}: LotInterface
  ) {
    this.uuid = uuid;
    this.name = name;
    this.area = area;
    this.factArea = factArea;
    this.water = water;
    this.gas = water;
    this.geometry = geometry;
    this.tenantUUID = tenantUUID;
    this.price = price;
    this.occupied = occupied;
    this.electicity = electicity;
    this.payPeriod = payPeriod;
  }
  clone() {
    console.log('cloning');
    const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    console.log(clone);
    return clone;
  }
}

export default Lot;