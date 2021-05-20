import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import { Mobi } from "./components/Mobi.js"
import './index.css';
// import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Mobi />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);