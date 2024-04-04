import Hint from "./components/Hint/Hint";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="App-container">
        <Hint
          side="left"
          hintLabel={<a href="https://next.privat24.ua/">I'm a hint</a>}
          hintElement={<div>Hover this box</div>}
        ></Hint>

        <Hint
          side="top"
          hintLabel={"I'm a hint"}
          hintElement={<div>Hover this box</div>}
        ></Hint>

        <Hint
          side="bottom"
          hintLabel={"I'm a hint"}
          hintElement={<div>Hover this box</div>}
        ></Hint>

        <Hint
          side="right"
          hintLabel={"I'm a hint"}
          hintElement={<div>Hover this box</div>}
        ></Hint>
      </div>
    </div>
  );
}
