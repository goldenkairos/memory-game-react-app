import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <img
            src={require("./assets/cover.jpg")}
            className="CardCover"
            alt="logo"
          />
          Hello World!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React Rules
        </a>
      </header>
    </div>
  );
}

export default App;
