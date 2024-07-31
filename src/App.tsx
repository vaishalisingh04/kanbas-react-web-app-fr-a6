import React from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Lab1 from ".//Labs/Lab1";
import TOC from ".//Labs/TOC";
import Lab2 from ".//Labs/Lab2";
import Lab3 from ".//Labs/Lab3";
import Kambaz from "./Kambaz";
import Labs from "./Labs";
import Lab4 from "./Labs/Lab4";
import LandingPage from "./LandingPage";
import store from "./../src/Labs/store";
import { Provider } from "react-redux";
import Lab5 from "./Labs/Lab5";
function App() {
  return (
    <HashRouter>
       <Provider store={store}>
      <div className="App h-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path ="/Labs" element ={<Labs/>} />
          <Route path="/Labs/Lab1" element={<Lab1 />} />
          <Route path="/Labs/Lab2" element={<Lab2 />} />
          <Route path="/Labs/Lab3" element={<Lab3 />} />
          <Route path="/Labs/Lab4" element={<Lab4 />} /> 
          <Route path="/Labs/Lab5" element={<Lab5 />} /> 
          <Route path="/Kambaz/*" element={<Kambaz />} />
        </Routes>
      </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
