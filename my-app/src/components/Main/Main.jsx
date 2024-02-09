import React from 'react';
import './main.css';

const Main = () => {
    return (
      <div>
        <h1>Welcome to Speedy Speedy</h1>
        <p class="instruc">You have 60 seconds. Once you press a button the timer will start. type as fast as you can!</p>
        <div class ="out">
          <p class="rec"></p>
          <input class = "txt" type="text"></input>
        </div>
        
      </div>
    )
  }
  
  export default Main