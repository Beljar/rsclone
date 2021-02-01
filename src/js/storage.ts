import Lot from './DataModels/lot';
import Tenant from './DataModels/tenant';
import Contract from './DataModels/contract';

function addLotToStorage(lot: Lot) {
  let data = localStorage.getItem('lots');
  if (data) {
    let lots = JSON.parse(data);
    lots.push(lot);
    localStorage.setItem('lots', JSON.stringify(lots));
  } else {
    localStorage.setItem('lots', JSON.stringify([lot]));
  }
}

function getLotsFromStorage() {
  let data = localStorage.getItem('lots');
  if (data) {
    return JSON.parse(data);
  } else {
    return []
  }
}

function setLotsToStorage(lots:Array<Lot>) {
  localStorage.setItem('lots', JSON.stringify(lots));
}

function addTenanttoStorage(tenant:Tenant) {
  let data = localStorage.getItem('tenants');
  if (data) {
    let tenants = JSON.parse(data);
    tenants.push(tenant);
    localStorage.setItem('tenants', JSON.stringify(tenants));
  } else {
    localStorage.setItem('tenants', JSON.stringify([tenant]));
  }
}

function getTenantByLotUUID (uuid:string) {

}

function addContractToStorage(contract:Contract) {
  let data = localStorage.getItem('contracts');
  if (data) {
    let contracts = JSON.parse(data);
    contracts.push(contract);
    localStorage.setItem('contracts', JSON.stringify(contracts));
  } else {
    localStorage.setItem('contracts', JSON.stringify([contract]));
  }
}

function getContractByLotUUID(lotUUID:string){
  let data = localStorage.getItem('contracts');
  if (data) {
    let contracts = JSON.parse(data);
    let contract = contracts.find((itm : Contract) => itm.lotUUID === lotUUID);
    return contract;
  }
  return null;
}

function getTenantByUUID(tenantUUID: string) {
  let data = localStorage.getItem('tenants');
  if (data) {
    let tenants = JSON.parse(data);
    let tenant = tenants.find((itm : Tenant) => itm.uuid === tenantUUID);
    return tenant;
  }
  return null;
}

function getTenants() {
  let data = localStorage.getItem('tenants');
  if(data) {
    return JSON.parse(data);
  }
  return [];
}

export { addLotToStorage, getLotsFromStorage, setLotsToStorage, addTenanttoStorage, addContractToStorage, getContractByLotUUID, getTenantByUUID, getTenants };