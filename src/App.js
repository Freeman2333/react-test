import React, {useState} from 'react';
import DisplayComponent from './Components/DisplayComponent';
import BtnComponent from './Components/BtnComponent';
import './App.css';

function App() {
  const [time, setTime] = useState({s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  // const [startBtnOn, setStartBtnOn] = useState(true);

  

  const start = () => {
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
    start()
  };

  const resume = () => start();

  const startBtnClick = () => {
    if (interv) {
      stop()
      setTime({ s: 0, m: 0, h: 0 })
      setInterv('')
    }
    if (!interv) {
      start()
    }
  }

  return (
    <div className="main-section">
     <div className="clock-holder">
          <div className="stopwatch">
               <DisplayComponent time={time}/>
               <BtnComponent  resume={resume} reset={reset} stop={stop} start={startBtnClick}/>
          </div>
     </div>
    </div>
  );
}

export default App;
