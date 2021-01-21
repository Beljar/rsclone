import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';

export default class PriceCalculator extends Component {
  static getDerivedStateFromProps(props, state) {
    return { lot: props.lot };
  }
  constructor(props) {
    super(props);
    this.priceTotal = React.createRef();
    this.pricePerMeter = React.createRef();
    this.setPricePerMeter = this.setPricePerMeter.bind(this);
    this.setPriceTotal = this.setPriceTotal.bind(this);
    this.state = {lot:this.props.lot};
  }
setPricePerMeter(e) {
  console.log(e.target);
  this.setState((state) => {
    const lot = state.lot;
    lot.price = e.target.value;
    return {
      lot:lot
    }
  })
  
}
setPriceTotal(e) {

}
  render() {
    return <Fragment>
      <div className='form__row'>
        <span className='form--label'>Per meter:</span>
        <span className='form--input'><TextField value={this.state.lot.price || ''} type='text' onChange={this.setPricePerMeter} /></span>
      </div>
      <div className='form__row'>
        <span className='form--label' >Total:</span>
        <span className='form--input'><TextField value={this.state.lot.price || ''} type='text' onChange={this.setPriceTotal} /></span>
      </div>
    </Fragment>
  }
}