import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Map from './map.jsx';
import { Circle } from 'react-leaflet';
import LotComponent from './lot.jsx';
import Lot from './lot.ts';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../style/style.scss';
import 'leaflet/dist/leaflet.css';
import polygonArea from './polygonArea.ts';

const scale = 8;

class App extends Component {
  constructor() {
    super();
    this.addLot = this.addLot.bind(this);
    this.selectLot = this.selectLot.bind(this);
    this.unSelectLot = this.unSelectLot.bind(this);
    this.state = {
      objects: [
        <Circle center={[0, 0]} radius={500} />,
        <Circle center={[200, 100]} radius={500} />
      ],
      pts: [],
      lots: [],
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
      area: Math.round((polygonArea(coordinates) / (scale ** 2)) * 10) / 10}
      )
      lots.push(lot);
      return {
        lots
      }
    })
    console.log('lot added');
    console.log(this.state.lots)
  }
  selectLot(id) {
    console.log('select lot');
    console.log(id);
    this.setState({
      selectedLotId: id
    })
  }
  clickHandle(e) {
    console.log(e);
    this.setState({
      pts: this.state.pts.concat([[e.latlng.lat, e.latlng.lng]])
    })
  }

  render() {
    return <div>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Map polygons={this.state.lots.map((itm) => itm.geometry.coordinates)} onPolygonAdd={this.addLot} onPolygonSelected={this.selectLot} selectedPolygonId={this.state.selectedLotId}/>
        </Grid>
        <Grid item xs={3}>
          {(this.state.selectedLotId !== null) ? <LotComponent lot={this.state.lots[this.state.selectedLotId]} onUnSelect={this.unSelectLot}/> : <div>Select lot</div>}
        </Grid>
      </Grid>
    </div>
  }

}

ReactDom.render(<App />, document.querySelector('#app'));