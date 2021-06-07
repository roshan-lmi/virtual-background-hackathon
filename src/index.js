import React from "react";
import ClearCache from "react-clear-cache";
import ReactDOM from "react-dom";
import Routes from "./components/Routes";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <ClearCache auto={true}>
        {({ isLatestVersion }) => (
          <div>
            {!isLatestVersion && (
              <p style={{ color: "white" }}>Updating this version ...</p>
            )}
            {isLatestVersion && <Routes />}
          </div>
        )}
      </ClearCache>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
