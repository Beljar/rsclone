import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Map from './map.jsx';
import { Circle } from 'react-leaflet';
import '../style/style.scss';
import 'leaflet/dist/leaflet.css';

class App extends Component {
  constructor() {
    super();
    this.clickHandle = this.clickHandle.bind(this);
    this.state = {
      objects: [
        <Circle center={[0, 0]} radius={500} />,
        <Circle center={[200, 100]} radius={500} />
      ],
      pts: []
    }
  }
  clickHandle(e) {
    console.log(e);
    this.setState({
      pts: this.state.pts.concat([[e.latlng.lat, e.latlng.lng]])
    })
  }
  render() {
    return <div><Map onClick={this.clickHandle} objects={this.state.objects} pts={this.state.pts} /></div>
  }
}

ReactDom.render(<App />, document.querySelector('#app'));