import { v4 as uuidv4, v4 } from 'uuid';

interface ContractInterface {
  uuid?: string,
  tenantUUID?: string,
  lotUUID?: string,
}

class Contract {
  uuid: string;
  tenantUUID: string;
  lotUUID: string;
  constructor({
    uuid = uuidv4(),
    tenantUUID = null,
    lotUUID = null
  }: ContractInterface = {}) {
    this.uuid = uuid;
    this.tenantUUID = tenantUUID;
    this.lotUUID = lotUUID;
  }
}

export default Contract;