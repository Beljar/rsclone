import { v4 as uuidv4, v4 } from 'uuid';

interface TenantInterface {
  uuid?: string;
  name?: string;
  itn?: number;
}

export default class Tenant {
  uuid: string;
  name: string;
  itn: number;
  constructor({
    uuid = uuidv4(),
    name = null,
    itn = null
  }: TenantInterface = {}) {
    this.uuid = uuid;
    this.name = name;
    this.itn = itn;
  }
  clone(){
    return new Tenant(
      {uuid:this.uuid,
      name:this.name,
      itn:this.itn}
    );
      }
}