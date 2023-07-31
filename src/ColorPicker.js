import React, { useState } from 'react';
import { ChromePicker } from 'react-color'
import './App.css';

const ColorPicker = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false)
  const handleClick = () => {
    setShowPicker(!showPicker)
  };

  const handleClose = () => {
    setShowPicker(false)
  };
  const popover = {
    position: 'absolute',
    zIndex: '2',
  }
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }
  const colorPicker = {
   backgroundColor: color
  }

  return (
    
    <div className='colorContainer'>
        <label>Change Color: </label>
        <div style={colorPicker} className='colorPicker' onClick={handleClick}/>
        { showPicker ? <div style={ popover }>
          <div style={ cover } onClick={ handleClose }/>
          <ChromePicker onChange={onChange} color={color} />
        </div> : null }
      </div>
  );
};

export default ColorPicker;
