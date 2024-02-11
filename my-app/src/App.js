import React, {useState} from 'react'
import {Main, Result} from './components';
import './app.css'

const App = () => {

  const [view, setView] = useState(0);
  const [correctNum, setNum] = useState(0);

  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Koulen' rel='stylesheet'></link>
      {
        view ? <Result correct={correctNum} /> : <Main setNum={setNum} setView={setView} />
      }
    </div>
  )
}

export default App