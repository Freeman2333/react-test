import React, {useState} from 'react';
import DisplayComponent from './Components/DisplayComponent';
import BtnComponent from './Components/BtnComponent';
import './App.css';

function App() {
  const [time, setTime] = useState({s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  const [waitBtnOn, setWaitBtnOn] = useState(false);
  const [doubleClickOn, setDoubleClickOn] = useState(false);
  const [startBtnText, setStartBtnText] = useState('start');

  const setWaitLogic = () => {
    setWaitBtnOn(true)
    setStartBtnText('start')
    stop()
  }

  const waitBtnClick = () => {
    if (doubleClickOn) {
      setWaitLogic()
      setDoubleClickOn(false)
    }
    if (!doubleClickOn) {
      setDoubleClickOn(true)
      setTimeout(() => {
        setDoubleClickOn(false)
      },300)
    }
  }

  const start = () => {
    clearInterval(interv)
    setInterv(setInterval(run, 1000));
  };

  let updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    updatedS++;
    return setTime({ s:updatedS, m:updatedM, h:updatedH});
  };

  const stop = () => {
    clearInterval(interv);
  };

  const reset = () => {
    clearInterval(interv);
    setTime({ s: 0, m: 0, h: 0 })
    updatedS = 0
    updatedM = 0
    updatedH = 0
    start()
    setStartBtnText('stop')
  };

  const startBtnClick = () => {
    if (waitBtnOn) {
      start()
      setStartBtnText('stop')
      setWaitBtnOn(false)
    }
    if (!waitBtnOn) {
      setStartBtnText('stop')
      if (interv) {
        stop()
        setTime({ s: 0, m: 0, h: 0 })
        setInterv('')
      }
      if (!interv) {
        start()
      }
    }
    if ((updatedS > 0) && !waitBtnOn) {
      setStartBtnText('start')
    }
  }

  return (
    <div className="main-section">
     <div className="clock-holder">
      <div className="stopwatch">
        <DisplayComponent time={time}/>
        <BtnComponent reset={reset} waitBtnClick={waitBtnClick} startBtnClick={startBtnClick} startBtnText={startBtnText} />
      </div>
      </div>
    </div>
  );
}

export default App;
