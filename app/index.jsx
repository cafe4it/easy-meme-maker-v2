require('expose?$!expose?jQuery!jquery');
require("bootstrap-webpack");

require('./fonts/custom.css');
import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
ReactDOM.render(<App />, document.getElementById('app'));