import Lot from './DataModels/lot';

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

export { addLotToStorage, getLotsFromStorage, setLotsToStorage };