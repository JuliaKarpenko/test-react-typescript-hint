import React, { useRef } from "react";
import Hint from "./components/Hint/Hint";
import "./App.css";

export default function App() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <div className="App-container">
        <Hint elementRef={leftRef} side="left">
          <a href="https://next.privat24.ua/">I'm a hint left</a>
        </Hint>
        <div ref={leftRef}>Hello world</div>

        <Hint elementRef={topRef} side="top">
          "I'm a hint top"
        </Hint>
        <div ref={topRef}>Hello world</div>

        <Hint elementRef={bottomRef} side="bottom">
          <span>I'm a hint bottom</span>
        </Hint>
        <div ref={bottomRef}>Hello world</div>

        <Hint elementRef={buttonRef} side="right">
          <span>I'm a hint right</span>
        </Hint>
        <button className="button" ref={buttonRef}>
          Hello world
        </button>
      </div>
    </div>
  );
}
