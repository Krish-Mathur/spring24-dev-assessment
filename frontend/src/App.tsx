import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VolunteerTable from './VolunteerTable';
import VolunteerDeets from './VolunteerDeets';
import './App.css';

function App() {
  return (
      <div className="App">
        <h1>Volunteer Information</h1>
          <VolunteerTable key = {Date.now()} />
      </div>
  );
}

export default App;
