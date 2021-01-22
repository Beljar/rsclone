import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import PriceCalculator from './priceCalculator.jsx';

class LotComponent extends Component {
  static getDerivedStateFromProps(props, state) {
    return { lot: props.lot };
  }
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.setId = this.setId.bind(this);
    console.log(this.props.lot);
    console.log(this.props.lot.clone());
    this.state = { lot: this.props.lot };
  }
  save() {
    this.props.onSave(this.state.lot);
  }
  setId(e) {
    console.log(e.target.value);
    this.setState((state) => {
      console.log(state);
      const lot = state.lot;
      console.log(lot);
      lot.name = e.target.value;
      return {
        lot: lot
      }
    })
  }
  render() {
    console.log('render lot');
    console.log(this.props.lot);
    return <div className="section">
      <div className='section__h1'>Lot {this.props.lot.name}</div>
      <div className='form'>
        {/* <div>System ID: {this.props.lot.id}</div> */}
        <div className='form__row'>
          <span className='form--label'>Name:</span>
          <span className='form--input'><TextField type='text' value={this.props.lot.name || ''} onChange={this.setId} /></span>
        </div>
        <div className='form__row'>
          <span className='form--label'>Status</span>
          <span className='form--input'>
            <Select
              native
              value={0}
            >
              <option value={0}>Idle</option>
              <option value={1}>Occupied</option>
              <option value={2}>Reserved</option>
            </Select></span>
        </div>
        <div className='form__row'>
          <span className='form--label'>Area by draft:</span>
          <span className='form--input'>{this.props.lot.area}</span>
        </div>
        <div className='form__row'>
          <span className='form--label'>Area by fact:</span>
          <span className='form--input'><TextField type='text' /></span>
        </div>
        <div className='form__row'>
          <span className='form--label'>Max electric output:</span>
          <span className='form--input'><TextField type='text' /></span>
        </div>
        <div className='form__row'>
          <span className='form--label'>Water:</span>
          <span className='form--input'><TextField type='text' /></span>
        </div>
        <div className='form__row'>
          <span className='form--label'>Gas:</span>
          <span className='form--input'><TextField type='text' /></span>
        </div>
        <div className='form--label' className='section__h2'>Price</div>
        <div className='form__row'>
          <span className='form--label'>Pay period:</span>
          <span className='form--input'>
            <Select
              native
              value={2}>
              <option value={0}>Day</option>
              <option value={1}>Week</option>
              <option value={2}>Month</option>
              <option value={3}>Year</option>
            </Select></span>
        </div>
        <div className='form--label' className='section__h3 section__text--green'>Recommended price:</div>
        <div className='form__row'>
          <span className='form--label'>Per meter:</span>
          <span className='form--input'><TextField type='text' /></span>
        </div>
        <div className='form__row'>
          <span className='form--label'>Total:</span>
          <span className='form--input'><TextField type='text' /></span>
        </div>
        <span className='form--label' className='section__h3 section__text--red'>Minimal price:</span>
        <PriceCalculator lot={this.state.lot} />
        <div className='form__button-block'>
          <Button className='lot__btn' color='primary' variant="contained" onClick={this.save}>Save</Button>
          <Button className='lot__btn' color='primary' variant="contained" onClick={this.props.onUnSelect} >Unselect</Button>
          <Button className='lot__btn' color='secondary' variant="contained" onClick={() => this.props.onDelete(this.props.lot.name)} >Delete</Button>
        </div>
      </div>
    </div>
  }
}

export default LotComponent;