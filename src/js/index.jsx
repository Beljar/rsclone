import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Map from './Components/map.jsx';
import { Circle } from 'react-leaflet';
import LotComponent from './Components/lot.jsx';
import Lot from './DataModels/lot.ts';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../style/style.scss';
import 'leaflet/dist/leaflet.css';
import polygonArea from './Lib/polygonArea.ts';
import { addLotToStorage, getLotsFromStorage, setLotsToStorage } from './storage.ts';

const scale = 8;

class App extends Component {
  constructor() {
    super();
    this.addLot = this.addLot.bind(this);
    this.selectLot = this.selectLot.bind(this);
    this.unSelectLot = this.unSelectLot.bind(this);
    this.deleteLot = this.deleteLot.bind(this);
    this.state = {
      pts: [],
      lots: getLotsFromStorage().map((itm) => new Lot(itm)),
      selectedLotId: null
    }
  }
  unSelectLot() {
    console.log('unselect');
    this.setState({
      selectedLotId: null
    })
  }
  addLot(coordinates) {
    console.log('adding lot');
    this.setState((state) => {
      const lots = state.lots;
      const lot = new Lot({
        geometry:
          { type: 'polygon', coordinates },
        area: Math.round((polygonArea(coordinates) / (scale ** 2)) * 10) / 10
      }
      )
      lots.push(lot);
      addLotToStorage(lot);
      return {
        lots
      }
    })
    console.log('lot added');
    console.log(this.state.lots);

  }
  selectLot(id) {
    console.log('select lot');
    console.log(id);
    this.setState({
      selectedLotId: id
    })
  }

  deleteLot(uuid) {
    console.log('delete')
    const id = this.state.lots.findIndex((itm) => itm.id === uuid);
    console.log(id);
    if (this.state.selectedLotId === id) {
      console.log('unselect')
      this.unSelectLot();
    }
    this.setState((state) => {
      const lots = state.lots;
      lots.splice(id, 1);
      setLotsToStorage(lots);
      return {
        lots
      }
    })

  }

  saveLot() {

  }

  clickHandle(e) {
    console.log(e);
    this.setState({
      pts: this.state.pts.concat([[e.latlng.lat, e.latlng.lng]])
    })
  }

  render() {
    console.log('render main');
    console.log(this.state);
    return <div>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Map polygons={this.state.lots.map((itm) => itm.geometry.coordinates)} onPolygonAdd={this.addLot} onPolygonSelected={this.selectLot} selectedPolygonId={this.state.selectedLotId} onPolygonDeleted={this.deleteLot}/>
        </Grid>
        <Grid item xs={3}>
          {(this.state.selectedLotId !== null) ? <LotComponent lot={this.state.lots[this.state.selectedLotId]} onUnSelect={this.unSelectLot} onDelete={this.deleteLot} onSave={this.saveLot}/> : <div>Select lot</div>}
        </Grid>
      </Grid>
    </div>
  }

}

ReactDom.render(<App />, document.querySelector('#app'));