import React, { useEffect, useState } from 'react';
import SierpinskiTriangle from './SierpinskiTriangle';
import ColorPicker from './ColorPicker';
import './App.css';

const App = () => {
  const [depth, setDepth] = useState(1);
  const [color, setColor] = useState('#ff0000');
  const [start, setStart] = useState(false)
  const [intervalId, setIntervalId] = useState(null)
  const [value, setValue] = useState({
    depth: 1,
    color
  })

  const onsubmit = () => {
    setValue({
      color,
      depth
    })
  }

  const generate = () => {
    if (start) {
      stopGenerating();

    } else {
      startGenerating();

    }
  }
  useEffect(() => {
    if (depth >= 9 && start) {
      stopGenerating()
    }
  }, [depth])

  const startGenerating = () => {
    setStart(true)
    setValue({
      depth: 1,
      color: '#ff0000'
    })
    const myInterval = setInterval(() => {

      setValue(prevValue => { return { depth: prevValue.depth + 1, color: prevValue.color } })
    }, 3000)
    setIntervalId(myInterval)


  }
  const stopGenerating = () => {
    setStart(false)
    clearInterval(intervalId);
  }

  const handleDepthChange = (e) => {
    setDepth(Number(e.target.value));
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };
  const decreaseDepth = () => {
    setDepth(0 === depth ? 0 : depth - 1);
  }
  const increaseDepth = () => {
    setDepth(depth + 1)
  }

  return (
    <div className="app-container">
      <h1>Sierpinski Triangle Visualization (Max Depth 9)</h1>
      <p>Maximum Depth of this application is 9. As above that call size exceed of the browser. This can also be resolved with more optimised code.</p>
      <p>Start Generating without Properties will start creating triangle from depth 1 and depth will continue to increase after every 3 seconds untill user stops.</p>
      <ColorPicker disabled={start} color={color} onChange={handleColorChange} />
      <div className='depthContainer'>
        <label>Depth:</label>
        <div className="value-button" id="decrease" onClick={decreaseDepth} >-</div>
        <input type="number" id="number" value={depth} onChange={handleDepthChange} />
        <div className="value-button" id="increase" onClick={increaseDepth}>+</div>
      </div>
      <div className='buttonContainer'>
        <button disabled={depth>9} onClick={onsubmit} className="button-82-pushable" role="button">
          <span className="button-82-shadow"></span>
          <span className="button-82-edge"></span>
          <span className="button-82-front text">
            Generate with properties
          </span>
        </button>
        <button onClick={generate} className="button-82-pushable" role="button">
          <span className="button-82-shadow"></span>
          <span className="button-82-edge"></span>
          <span className="button-82-front text">
            {!start ? 'Start without properties' : 'Stop'}
          </span>
        </button>
      </div>

      <SierpinskiTriangle depth={value.depth} color={value.color} />
    </div>
  );

};

export default App;
