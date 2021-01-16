import React from 'react';

function Btn(props) {
    return <div className='btn' onClick={props.onClick}>{props.text}</div>
}

export default Btn;