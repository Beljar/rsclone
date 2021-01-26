import { v4 as uuidv4, v4 } from 'uuid';

interface ContractInterface {
  uuid?: string,
  tenantUUID?: string,
  lotUUID?: string,
}

class Contract {
  constructor({
    uuid = uuidv4(),
    tenantUUID = null,
    lotUUID = null
  }:ContractInterface = {}) {

  }
}

export default Contract;