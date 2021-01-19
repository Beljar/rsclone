import React, { Component } from 'react';
import Input from './UI/input.jsx';
import Btn from './UI/btn.jsx';

class LotComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.lot)
  }
  save(){

  }
  render() {
    return <div>
      <div>System ID: {this.props.lot.id}</div>
      <div>Area by draft: {this.props.lot.area}</div>
      <div>
        <span>Area defacto</span>
        <Input />
      </div>
      <Btn text='save'/>
      <Btn text='Unselect' onClick={this.props.onUnSelect}/>
    </div>
  }
}

export default LotComponent;