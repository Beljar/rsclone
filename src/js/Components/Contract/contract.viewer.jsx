import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';

function view(props) {
  return <Fragment>
    <div className='section__h2'>Tenant {(props.tenant === null) ? null : props.tenant.name}</div>
    <div className='form__row'>
      <span className='form--label'>Name:</span>
      <span className='form--input'>{props.tenant.name}</span>
    </div>
    <div className='form__row'>
      <span className='form--label'>ITN:</span>
      <span className='form--input'>{props.tenant.ITN}</span>
    </div>
    <div className='form--label' className='section__h2'>Payment:</div>
    <div className='form__row'>
      <span className='form--label'>Pay period:</span>
      <span className='form--input'>{props.contract.payPeriod}</span>
    </div>

    <div className='form__row'>
      <span className='form--label'>Per meter:</span>
      <span>{props.contract.paymentPerMeter}</span>
    </div>
    <div className='form__row'>
      <span className='form--label'>Total:</span>
      <span>{props.contract.paymentTotal}</span>
    </div>
    <div className='form--label' className='section__h2'>Terms:</div>
    <div className='form__row'>
      <span className='form--label'>Start:</span>
      <span>{props.contract.startDate}</span>
    </div>
    <div className='form__row'>
      <span className='form--label'>End:</span>
      <span>{props.contract.endDate}</span>
    </div>
    <div className='form__button-block'>
      <Button className='lot__btn' color='secondary' variant="contained" onClick={props.onUnSelect} >Stop Contract</Button>
    </div>
  </Fragment>
}

export default view;