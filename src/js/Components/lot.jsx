import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import PriceCalculator from './priceCalculator.jsx';
import Checkbox from '@material-ui/core/Checkbox';
import config from '../constants.ts';

class LotComponent extends Component {
  static getDerivedStateFromProps(props, state) {
    console.log('derive')
    return { lot: props.lot };
  }

  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.setLotProp = this.setLotProp.bind(this);
    this.setRecommendedPriceTotal = this.setRecommendedPriceTotal.bind(this);
    this.setRecommendedPricePerMeter = this.setRecommendedPricePerMeter.bind(this);
    this.recommendedPriceTotal = React.createRef();
    console.log(this.props.lot);
    console.log(this.props.lot.clone());
    this.state = { lot: this.props.lot };
    this.ppm = null;
  }

  save() {
    this.props.onSave(this.state.lot);
  }

  setLotProp(e) {
    console.log(e.target.type);
    const key = e.target.name;
    let val;
    if (e.target.type === 'text') {
      val = e.target.value;
    } else if (e.target.type === 'checkbox') {
      val = e.target.checked;
    } else if (e.target.type === 'select-one') {
      val = e.target.value;
    }
    if (config.debug) {
      console.log(`assigning ${key} ${val} to lot`);
    }
    this.setState((state) => {
      console.log(state);
      const lot = state.lot;
      if (config.debug) {
        console.log(lot);
      }
      lot[key] = val;
      if (config.debug) {
        console.log(lot);
      }
      return {
        lot: lot
      }
    })
  }

  setRecommendedPriceTotal(e) {
    this.ppm = null;
    this.setState((state) => {
      console.log(state);
      const lot = state.lot;
      if (config.debug) {
        console.log(lot);
      }
      lot['price'] = e.target.value;
      return {
        lot: lot
      }
    })
  }

  setRecommendedPricePerMeter(e) {
    this.ppm = e.target.value;
    this.setState((state) => {
      console.log(state);
      const lot = state.lot;
      if (config.debug) {
        console.log(lot);
      }
      lot['price'] = Math.round(e.target.value * state.lot.factArea * 100) / 100;
      return {
        lot: lot
      }
    })
  }

  render() {
    console.log('render lot');
    console.log(this.props.lot);
    return <div className="">
      <div className='section__h1'>Lot {this.props.lot.name}</div>
      <div className='form'>
        {/* <div>System ID: {this.props.lot.id}</div> */}
        <div className='form__row'>
          <span className='form--label'>Name:</span>
          <span className='form--input'><TextField name='name' type='text' value={this.props.lot.name || ''} onChange={this.setLotProp} /></span>
        </div>
        <div className='form__row'>
          <span className='form--label'>Status</span>
          {(this.props.lot.occupied) ?
          <span className='form--input text--red'>{ 'occupied'}</span> :
          <span className='form--input text--green'>{ 'idle'}</span>}
        </div>
        <div className='form__row'>
          <span className='form--label'>Area by draft:</span>
          <span className='form--input'>{this.props.lot.area}</span>
        </div>
        <div className='form__row'>
          <span className='form--label'>Area by fact:</span>
          <span className='form--input'><TextField type='text' name='factArea' value={this.props.lot.factArea} onChange={this.setLotProp} /></span>
        </div>
        <div className='form__row'>
          <span className='form--label'>Max electric output:</span>
          <span className='form--input'><TextField type='text' name='electicity' value={this.props.lot.electicity} onChange={this.setLotProp} /></span>
        </div>
        <div className='form__row'>
          <span className='form--label'>Water:</span>
          <span className='form--input'><Checkbox checked={this.props.lot.water} name='water' color='primary' onChange={this.setLotProp} />
          </span>
        </div>
        <div className='form__row'>
          <span className='form--label'>Gas:</span>
          <span className='form--input'><Checkbox checked={this.props.lot.gas} name='gas' color='primary' onChange={this.setLotProp} />
          </span>
        </div>
        <div className='form--label' className='section__h2'>Price</div>
        <div className='form__row'>
          <span className='form--label'>Pay period:</span>
          <span className='form--input'>
            <Select
              native
              value={this.props.lot.payPeriod}
              name='payPeriod'
              onChange={this.setLotProp}>
              <option value={0}>Day</option>
              <option value={1}>Week</option>
              <option value={2}>Month</option>
              <option value={3}>Year</option>              
            </Select></span>
        </div>
        <div className='form--label' className='section__h3 text--green'>Recommended price:</div>
        <div className='form__row'>
          <span className='form--label'>Per meter:</span>
          <span className='form--input'><TextField type='text' name='price' value={this.ppm || (Math.round((this.props.lot.price / this.props.lot.factArea) * 100) / 100) || ''} onChange={this.setRecommendedPricePerMeter} /></span>
        </div>
        <div className='form__row'>
          <span className='form--label'>Total:</span>
          <span className='form--input'><TextField type='text' value={this.props.lot.price || ''} onChange={this.setRecommendedPriceTotal} /></span>
        </div>
        {/* <span className='form--label' className='section__h3 text--red'>Minimal price:</span>
        <PriceCalculator lot={this.state.lot} /> */}
        <div className='form__button-block'>
          <Button className='lot__btn' color='primary' variant="contained" onClick={this.save}>Save</Button>
          <Button className='lot__btn' color='primary' variant="contained" onClick={this.props.onUnSelect} >Unselect</Button>
          <Button className='lot__btn' color='secondary' variant="contained" onClick={() => this.props.onDelete(this.props.lot.uuid)} >Delete</Button>
        </div>
      </div>
    </div>
  }
}

export default LotComponent;