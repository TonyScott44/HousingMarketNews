import React from "react";
import {BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Articles from "./pages/Articles";


const App = () =>
  <Router>
    <div>
      <Routes>
        <Route exact path = "/" components = {Articles} />
      </Routes>
    </div>
  </Router>
  
export default App;
