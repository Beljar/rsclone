import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TenantDialog from './tenantDialog.jsx';
import Tenant from '../DataModels/tenant.ts';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { addTenanttoStorage, getTenants } from '../storage.ts';


class TenantComponent extends Component {
  static getDerivedStateFromProps(props, state) {
    return {
      tenant: props.tenant,
      tenants: getTenants(),
      newMode: props.tenant ? state.newMode : 0
    };
  }

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
      tenantAssigned: 0,
      newMode: 0,
      tenants: getTenants()
    };
  }

  saveTenant() {
    this.formRef.reset();
    console.log('save tenant');
    console.log(this.state.tenant);
    addTenanttoStorage(this.state.tenant);
    this.props.onSave(this.state.tenant);
    this.setState((state) => {
      return {
        newMode: 0
      }
    })
  }

  selectTenant(name) {
    console.log('setting tenant');
    console.log(name);
    const tenant = this.state.tenants.find((itm) => itm.name === name);
    console.log(tenant);
    if (tenant) {
      this.props.onSave(tenant);
          this.setState((state) => {
      return {
        newMode: 0,
        tenant
      }
    })
    } else {
      this.resetTenant();
    }
  }

  setName(e) {
    console.log(e.target.value);
    this.setState((state) => {
      console.log(state);
      const tenant = state.tenant;
      console.log(tenant);
      tenant.name = e.target.value;
      return {
        freeze: 1,
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
      newMode: 1
    })
    this.props.newTenant();
    console.log(this.state);
  }

  resetTenant() {
    console.log('resetting')
    this.formRef.reset();
    this.props.onUnSelect();
    this.setState({
      tenant: null,
      newMode: 0
    })
    console.log(this.state);
  }

  render() {
    console.log('tenant render');
    console.log(this.state);
    return <div className="">
      <div className='section__h2'>Tenant {(this.state.tenant === null) ? null : this.state.tenant.name}</div>
      <div className='form'>
        {((this.state.tenant === null) || !this.state.newMode) ?
          <form ref={(el) => this.formRef = el}>
            <Autocomplete
              id="search"
              freeSolo
              options={this.state.tenants.map((itm) => itm.name)}
              onChange={(e, val) => this.selectTenant(val)}
              renderInput={(params) => (

                <div className='form__row'>
                  <span className='form__search-icon'><SearchIcon /></span>
                  <span className='form__search-field'><TextField {...params} label="find tenant" /></span>
                </div>

              )}
            />
            {(!this.state.newMode && this.state.tenant) ? <div>
              <div className='form__row'>
                <span className='form--label'>Name:</span>
                <span className='form--input'>{this.state.tenant.name}</span>
              </div>
              <div className='form__row'>
                <span className='form--label'>ITN:</span>
                <span className='form--input'>{this.state.tenant.ITN}</span>
              </div>
              <div className='form__row'>
                <span className='form--label'>Status</span>
              </div>
            </div> : null
            }
            <Button color='primary' variant="contained" onClick={this.newTenant}>New</Button>
          </form> :
          <form ref={(el) => this.formRef = el}>
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
            <Button className='lot__btn' color='primary' variant="contained" onClick={this.saveTenant} >Save</Button>
          </form>
        }
      </div>
    </div>
  }
}

export default TenantComponent;