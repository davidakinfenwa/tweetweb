import React from "react";
import "./App.css";
import { TweetComponentForm } from "./tweets";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <TweetComponentForm/>
          
        </div>
      </header>
    </div>
  );
}

export default App;
