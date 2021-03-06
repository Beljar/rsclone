import React, { Component, Fragment } from 'react';
import TenantComponent from '../tenant.jsx';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Contract from '../../DataModels/contract.ts';
import Tenant from '../../DataModels/tenant.ts';
import ContractViewComponent from './contract.viewer.jsx';
import { addContractToStorage, getTenantByUUID } from '../../storage.ts';

class ContractComponent extends Component {
  static getDerivedStateFromProps(props, state) {
    console.log('getDerived')
    console.log(props);
    const out = { 
      contract: props.contract || state.contract,
      newMode: (props.contract) ? 0 : 1,
      tenant: (props.contract) ? getTenantByUUID(props.contract.tenantUUID) : state.tenantSet ? state.tenant : ((state.newTenant) ? state.tenant : null)
    };
    if(state.newTenant){
      state.newTenant = 0;
    }
    if(state.tenantSet){
      state.tenantSet = 0;
    }
    return out;
  }
  constructor(props) {
    super(props);
    this.startContract = this.startContract.bind(this);
    this.setTenant = this.setTenant.bind(this);
    this.newTenant = this.newTenant.bind(this);
    this.unSelectTenant = this.unSelectTenant.bind(this);
    this.state = {
      contract: this.props.contract || (new Contract({lotUUID: this.props.lotUUID})),
      newMode: (this.props.contract) ? 0 : 1,
      tenant: (this.props.contract) ? getTenantByUUID(this.props.contract.tenantUUID) : null
    }
  }
  startContract() {
    console.log('starting contract');
    console.log(this.state.contract);
    addContractToStorage(this.state.contract);
    this.props.onStart(this.state.contract);
  }
  setTenant(tenant) {
    console.log('setting tenant');
    console.log(tenant.uuid);
    this.setState((state) => {
      const contract = state.contract;
      contract.tenantUUID = tenant.uuid;
      return {
        contract,
        tenant,
        tenantSet: 1
      }
    })
    console.log(this.state);
  }
  newTenant(){
    console.log('new tenant');
    this.setState((state) => {
      return {
        tenant: (new Tenant),
        newTenant: 1
      }
    })
  }
  unSelectTenant(){
    this.setState((state) => {
      return {
        tenant: null,
        newTenant: 0
      }
    })
  }
  render() {
    console.log('render contract');
    console.log(this.state);
    return <Fragment>
      <div className='section__h1'>Contract {(this.state.tenant === null) ? null : this.state.tenant.name}</div>
      {(this.state.newMode) ? <Fragment>
        <TenantComponent tenant={this.state.tenant} newMode={0} newTenant={this.newTenant} startContract={this.startContract} onUnSelect={this.unSelectTenant} onDelete={this.deleteTenant} onSave={this.setTenant} />
        <div className='form--label' className='section__h2'>Payment:</div>
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
        <div className='form__row'>
          <span className='form--label'>Per meter:</span>
          <span className='form--input'><TextField type='text' /></span>
        </div>
        <div className='form__row'>
          <span className='form--label'>Total:</span>
          <span className='form--input'><TextField type='text' /></span>
        </div>
        <div className='form--label' className='section__h2'>Terms:</div>
        <div className='form__row'>
          <span className='form--label'>Start:</span>
          <span className='form--input'><TextField type='text' /></span>
        </div>
        <div className='form__row'>
          <span className='form--label'>End:</span>
          <span className='form--input'><TextField type='text' /></span>
        </div>
        <div className='form__button-block'>
          <Button className='lot__btn' color='primary' variant="contained" onClick={this.startContract}>Start contract</Button>
        </div>
      </Fragment> :
      <ContractViewComponent tenant={this.state.tenant} contract={this.state.contract}/>
    }
    </Fragment>
  }
}

export default ContractComponent;