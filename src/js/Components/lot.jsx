import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Select from './UI/select.jsx';

class LotComponent extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.setId = this.setId.bind(this);
    console.log(this.props.lot);
    console.log(this.props.lot.clone());
    this.state = {lot: this.props.lot.clone()};
    }
  save() {

  }
  setId(e) {
    console.log(e.target.value);
    this.setState((state) => {
      console.log(state);
      const lot = state.lot;
      console.log(lot);
      lot.id = e.target.value;
      return {
        lot:lot
      }
    })
  }
  render() {
    return <div className='form'>
      {/* <div>System ID: {this.props.lot.id}</div> */}
      <div className='h1'>Lot {this.state.lot.id}</div>
      <div className='form__row'>
        <span className='form--label'>ID:</span>
        <span className='form--input'><input type='text' onChange={this.setId} /></span>
      </div>
      <div className='form__row'>
        <span className='form--label'>Status</span>
        <span className='form--input'><Select curVal={0} vals={['Idle', 'Occupied', 'Reserved']} /></span>
      </div>
      <div className='form__row'>
        <span className='form--label'>Area by draft:</span>
        <span className='form--input'>{this.props.lot.area}</span>
      </div>


      <div className='form__row'>
        <span className='form--label'>Area by fact:</span>
        <span className='form--input'><input type='text' /></span>
      </div>
      <Button color='primary' variant="contained">Save</Button>
      <Button className='lot__btn' color='primary' variant="contained" onClick={this.props.onUnSelect} >Unselect</Button>
      <Button className='lot__btn' color='secondary' variant="contained" onClick={() => this.props.onDelete(this.props.lot.id)} >Delete</Button>
    </div>
  }
}

export default LotComponent;