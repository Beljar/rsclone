import { v4 as uuidv4, v4 } from 'uuid';

interface TenantInterface {
  uuid?: string;
  name?: string;
  itn?: number;
  type?: number;
}

export default class Tenant {
  static types = {
    0: 'any',
    1: 'Food',
    2: 'Non-food',
    3: 'Cafe/restaurant',
    4: 'Cloths',
    5: 'Electronics',
    6: 'Jewellery',
  }
  uuid: string;
  name: string;
  itn: number;
  type: number;
  constructor({
    uuid = uuidv4(),
    name = '',
    itn = null,
    type = 0,
  }: TenantInterface = {}) {
    this.uuid = uuid;
    this.name = name;
    this.itn = itn;
    this.type = type;
  }
  clone(){
    const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    return this
}
}