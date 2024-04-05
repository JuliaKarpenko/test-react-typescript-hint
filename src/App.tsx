import Hint from "./components/Hint/Hint";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="App-container">
        <Hint
          side="left"
          hintContent={<a href="https://next.privat24.ua/">I'm a hint</a>}
          className="App-item App-item--left"
        >
          <div>Hover this box</div>
        </Hint>

        <Hint
          side="top"
          hintContent={"I'm a hint"}
          className="App-item App-item--top"
        >
          <div>Hover this box</div>
        </Hint>
        <div className="App-item--center">
          <Hint
            side="left"
            hintContent={<a href="https://next.privat24.ua/">I'm a hint</a>}
            className="App-item App-item--left"
          >
            <div>Hover this box</div>
          </Hint>
          <Hint
            side="top"
            hintContent={"I'm a hint"}
            className="App-item App-item--top"
          >
            <div>Hover this box</div>
          </Hint>
          <Hint
            side="bottom"
            hintContent={"I'm a hint"}
            className="App-item App-item--bottom"
          >
            <div>Hover this box</div>
          </Hint>
          <Hint
            side="right"
            hintContent={"I'm a hint"}
            className="App-item App-item--right"
          >
            <div>Hover this box</div>
          </Hint>
        </div>

        <Hint
          side="bottom"
          hintContent={"I'm a hint"}
          className="App-item App-item--bottom"
        >
          <div>Hover this box</div>
        </Hint>

        <Hint
          side="right"
          hintContent={"I'm a hint"}
          className="App-item App-item--right"
        >
          <div>Hover this box</div>
        </Hint>
      </div>
    </div>
  );
}
