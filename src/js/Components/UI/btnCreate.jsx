import React from 'react';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';

function CreateBtn(props) {
  return       <Button
  variant="contained"
  color="primary"
  onClick={props.onClick}
  startIcon={<CreateIcon />}
>
{props.text}
</Button>
}

export default CreateBtn;