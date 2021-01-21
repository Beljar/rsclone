import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TenantDialog from './tenantDialog.jsx';
import Tenant from '../DataModels/tenant.ts';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

class TenantComponent extends Component {
  constructor(props) {
    super(props);
    this.saveTenant = this.saveTenant.bind(this);
    this.setName = this.setName.bind(this);
    this.setITN = this.setITN.bind(this);
    this.resetTenant = this.resetTenant.bind(this);
    this.newTenant = this.newTenant.bind(this);
    console.log(this.props.tenant);
    this.state = {
      tenant: this.props.tenant,
      newMode: 0
    };
  }
  saveTenant() {

  }
  setName(e) {
    console.log(e.target.value);
    this.setState((state) => {
      console.log(state);
      const tenant = state.tenant;
      console.log(tenant);
      tenant.name = e.target.value;
      return {
        tenant: tenant
      }
    })
  }
  setITN(e) {
    console.log(e.target.value);
    this.setState((state) => {
      console.log(state);
      const tenant = state.tenant;
      console.log(tenant);
      tenant.itn = e.target.value;
      return {
        tenant: tenant
      }
    })
  }
  newTenant() {
    console.log('new tenant');
    this.setState({
      tenant: new Tenant(),
      newMode: 1
    })
    console.log(this.state);
  }
  resetTenant() {
    this.setState({
      tenant: null,
      newMode: 0
    })
  }

  render() {
    console.log('tenant render');
    console.log(this.state);
    return <div className="section">
      <div className='section__h1'>Tenant {(this.state.tenant === null) ? null : this.state.tenant.name}</div>
      <div className='form'>
        {(this.state.tenant === null) ?
          <div>
            <div className='form__row'>
              <span className='form--label'>Find:</span>
              <span className='form--input'><input type='text' /> </span>
            </div>
            <Button color='primary' variant="contained" onClick={this.newTenant}>New</Button>
          </div> :
          <div>
            <div className='form__row'>
              <span className='form--label'>Name:</span>
              <span className='form--input'><TextField type='text' onChange={this.setName} /></span>
            </div>
            <div className='form__row'>
              <span className='form--label'>ITN:</span>
              <span className='form--input'><TextField type='text' onChange={this.setITN} /></span>
            </div>
            <div className='form__row'>
              <span className='form--label'>Status</span>
              <span className='form--input'>
                <Select
                  native
                  value={0}
                >
                  <option value={0}>Any</option>
                  <option value={1}>Food</option>
                  <option value={2}>Non-food</option>
                  <option value={3}>Cafe/restaurant</option>
                  <option value={4}>Cloths</option>
                  <option value={5}>Electronics</option>
                  <option value={6}>Jewellery</option>
                </Select></span>
            </div>
            <Button className='lot__btn' color='primary' variant="contained" onClick={this.resetTenant} >Cancel</Button>
            <Button className='lot__btn' color='primary' variant="contained" onClick={this.resetTenant} >Save</Button>
          </div>
        }
        {((this.state.tenant !== null) && (!this.state.newMode)) ?
          <div>
            <Button color='primary' variant="contained" onClick={this.props.startContract}>Start contract</Button>
            <Button className='lot__btn' color='primary' variant="contained" onClick={this.props.onUnSelect} >Start reserve</Button>
          </div>
          : null}
      </div>
    </div>
  }
}

export default TenantComponent;