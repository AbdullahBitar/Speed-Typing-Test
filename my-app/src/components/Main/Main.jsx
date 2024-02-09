import React, { useState, useEffect } from 'react';
import './main.css';

const Main = () => {
  const allWords = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'very', 'many', 'much', 'before', 'those', 'too', 'may', 'look', 'more', 'where', 'such'];
  const [all, setAll] = useState("");

  useEffect(() => {
    const n = 100;
    let allText = "";
    for (let i = 0; i < n; i++) {
      const idx = Math.floor(Math.random() * allWords.length);
      allText += allWords[idx] + " ";
    }
    setAll(allText);
  }, []);

  return (
    <div>
      <h1>Welcome to Speedy Speedy</h1>
      <p className="instruc">You have 60 seconds. Once you press a button the timer will start. type as fast as you can!</p>
      <div className="out">
        <p className="rec">{all}</p>
        <input className="txt" type="text" />
      </div>
    </div>
  );
};

export default Main;
