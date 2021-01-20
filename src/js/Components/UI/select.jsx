import React from 'react';
import Select from '@material-ui/core/Select';

export default function SelectComponent(props) {
  return <Select
    native
    defaultValue={props.curVal}
    //onChange={handleChange}
/*     inputProps={{
      name: 'age',
      id: 'age-native-simple',
    }} */
  >
    {props.vals.map((itm, idx) => {
      return <option value={idx}>{itm}</option>
    })}
  </Select>
}