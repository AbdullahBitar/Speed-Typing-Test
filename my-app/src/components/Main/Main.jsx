import React, { useState, useEffect, useRef } from 'react';
import './main.css';

const Main = (props) => {
  const allWords = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'very', 'many', 'much', 'before', 'those', 'too', 'may', 'look', 'more', 'where', 'such'];
  const [second, setSecond] = useState(60);
  const [started, setStarted] = useState(0);
  const [chars, setChars] = useState([]);
  const [displayedWords, setDisplayedWords] = useState([]);
  const {setNum, setView} = props;

  //add random words and put every character inside a span.
  useEffect(() => {
    const n = 216;

    let temp = [], counter = 0, temp2 = [];

    for (let i = 0; i < n; i++) {
      const idx = Math.floor(Math.random() * allWords.length);

      for (let j = 0; j < allWords[idx].length; j++) {
        temp.push({ val: allWords[idx][j], idx: counter++, status: "" });
      }

      temp2.push(allWords[idx]);
      temp.push({ val: ' ', idx: counter++, status: "" });
    }

    setDisplayedWords(temp2);
    setChars(temp);
  }, []);

  const containerRef = useRef(null);
  //timer
  useEffect(() => {
    if (!started || !second) return;
    const interval = setInterval(() => {
      setSecond(prevSecond => prevSecond - 1);
    }, 1000);
    if(second == 1){
      setView(1);
      setNum(correctWords);
    }
    return () => clearInterval(interval);
  }, [started, second]);


  const [input, setInput] = useState("");
  const [idx, setIdx] = useState(0);
  const [myWords, setMyWords] = useState([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);

  function handlePress(key) {
    const isValid = /^[a-zA-Z0-9:;,.?!@#$%^&*()\-_=+|<>{}\[\]'"`~\\\/]$/.test(key);
    if ((key === " " || key === "Enter") && input !== '') {
      if (input == displayedWords[wordIdx]) setCorrectWords(prev => prev + 1);
      else {
        var temp = chars;
        for (let i = idx - Math.min(displayedWords[wordIdx].length, input.length); i < idx - Math.min(displayedWords[wordIdx].length, input.length) + displayedWords[wordIdx].length; i++) {
          temp[i].status = 'wrong';
        }
        setChars(temp);
      }
      var tmp = myWords;
      tmp.push(input);
      setMyWords(tmp);
      setWordIdx(prev => prev + 1);
      setIdx(prev => prev + (input.length >= displayedWords[wordIdx].length ? 1 : displayedWords[wordIdx].length - input.length + 1));
      setInput("");
    }
    else if (key === "Backspace") {
      var newInput = input.slice(0, -1);
      if (input == '') {
        if (myWords.length) {
          if (myWords[myWords.length - 1] == displayedWords[wordIdx - 1]) setCorrectWords(prev => prev - 1);
          var tmp = myWords;
          newInput = tmp.pop();

          var temp = chars, newIdx = idx - 1;

          for(let i = newIdx - displayedWords[wordIdx - 1].length ; i < newIdx ; i++){
            let j = i - (newIdx - displayedWords[wordIdx - 1].length);
            if(j >= newInput.length){
              temp[i].status = '';
            }
            else if(displayedWords[wordIdx - 1][j] == newInput[j])temp[i].status = 'correct';
            else temp[i].status = 'wrong';
          }

          setMyWords(tmp);
          const idxChange = (displayedWords[wordIdx - 1].length <= newInput.length ? 1 : 1 + displayedWords[wordIdx - 1].length - newInput.length);
          setIdx(prev => prev - idxChange);
          setWordIdx(prev => prev - 1);
        }
      }
      else if (displayedWords[wordIdx].length > newInput.length && idx) {
        var temp = chars;
        temp[idx - 1].status = '';
        setChars(temp);
        setIdx(prev => prev - 1);
      }
      else if (displayedWords[wordIdx] == newInput) {
        var temp = chars;
        for (let i = idx - newInput.length; i < idx; i++) {
          temp[i].status = 'correct';
        }
        setChars(temp);
      }
      setInput(newInput);
    }
    else if (isValid) {
      const correctWord = displayedWords[wordIdx];
      var temp = chars;
      var w = input.concat(key);
      setInput(w);
      for (let i = 0; i < Math.min(correctWord.length, w.length); i++) {
        if (correctWord[i] == w[i]) {
          if (correctWord.length >= w.length) {
            temp[idx - w.length + 1 + i].status = 'correct';
          }
          else {
            temp[idx - correctWord.length + i].status = 'correct';
          }
        }
        else {
          if (correctWord.length >= w.length) {
            temp[idx - w.length + 1 + i].status = 'wrong';
          }
          else {
            temp[idx - correctWord.length + i].status = 'wrong';
          }
        }
      }

      setChars(temp);

      if (w.length <= correctWord.length) setIdx(idx + 1);
    }
  }

  const start = (event) => {
    setStarted(1);
    handlePress(event.key);
  }

  const[element, setElement] = useState();

  useEffect(() => {
    const box = containerRef.current.getBoundingClientRect();
    const boxBottom = box.bottom;
    console.log(idx);
    
    setElement(document.getElementById(idx));
    if(element == null)return;

    const normalHeight = document.getElementById('52').getBoundingClientRect().bottom - document.getElementById('1').getBoundingClientRect().bottom;

    const chRef = element.getBoundingClientRect();
    const chBottom = chRef.bottom;

    if(boxBottom - chBottom < normalHeight){
      const scrollAmount = normalHeight - (boxBottom - chBottom);
    
      containerRef.current.scrollTo({
          top: containerRef.current.scrollTop + scrollAmount,
          behavior: 'auto'
      });
    }

  }, [idx]);

  return (
    <div>
      <h1>Welcome to Speedy Speedy</h1>
      <p className="instruc">You have 60 seconds. Once you press a button the timer will start. type as fast as you can!</p>
      <p id="timer" class="instruc">Time remaining: {second}</p>
      <div className="out">
        <div ref={containerRef} className="rec" id="txt">
          {
            chars.map((val) => (
              <span id={val.idx} class={val.status}>{val.val}</span>
            ))
          }
        </div>
        <input autocomplete="off" className="txt" type="text" id="inpt" value={input} onKeyDown={start} />
      </div>
      <p>{correctWords}</p>
    </div>
  );
};

export default Main;
