import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Map from './Components/map.jsx';
import { Circle } from 'react-leaflet';
import LotComponent from './Components/lot.jsx';
import TenantComponent from './Components/tenant.jsx';
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
    this.saveLot = this.saveLot.bind(this);
    this.state = {
      pts: [],
      lots: getLotsFromStorage().map((itm) => new Lot(itm)),
      selectedLotId: null,
      tenant: null,
      modalMode: 0
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
    const id = this.state.lots.findIndex((itm) => itm.uuid === uuid);
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

  saveLot(lot) {
    console.log('save lot');
    console.log(lot);
    const id = this.state.lots.findIndex((itm) => itm.uuid === lot.uuid);
    console.log(id);
    this.setState((state) => {
      const lots = state.lots;
      lots.splice(id, 1, lot);
      setLotsToStorage(lots);
      return {
        lots
      }
    })
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
      <div className='header'>
        <i className='logo'></i>
        <span className='header__h1'>Estate Agent</span>
      </div>
      <div className="body-container">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={9} lg={7}>
            <div className='section inner-shadow' >
              <Map polygons={this.state.lots.map((itm) => itm.geometry.coordinates)} onPolygonAdd={this.addLot} onPolygonSelected={this.selectLot} selectedPolygonId={this.state.selectedLotId} onPolygonDeleted={this.deleteLot} />
            </div>
          </Grid>
          <Grid item xs={12} sm={3} lg={5}>
          <div className='section inner-shadow' >
            <div className="inner-container">
              <Grid container  xs={12} >
                <Grid  item xs={6} sm={12} lg={6} className=''>
                  {(this.state.selectedLotId !== null) ? <LotComponent lot={this.state.lots[this.state.selectedLotId].clone()} onUnSelect={this.unSelectLot} onDelete={this.deleteLot} onSave={this.saveLot} /> : <div>Select lot</div>}
                </Grid>
                <Grid  item xs={6} sm={12} lg={6} className=''>
                  {(this.state.selectedLotId !== null) ? <TenantComponent tenant={this.state.tenant} startContract={this.startContract} /> : null}
                </Grid>
              </Grid>
            </div>
            </div>
          </Grid>
        </Grid>
      </div>
      {(this.state.modalMode) ? <div className='overlay'></div> : null}
    </div>
  }

}

ReactDom.render(<App />, document.querySelector('#app'));