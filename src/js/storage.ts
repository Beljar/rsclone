import Lot from './DataModels/lot';
import Tenant from './DataModels/tenant';

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

function addTenant(tenant:Tenant) {
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

export { addLotToStorage, getLotsFromStorage, setLotsToStorage, addTenant };