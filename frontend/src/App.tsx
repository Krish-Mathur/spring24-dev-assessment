import React from 'react';
import VolunteerTable from './VolunteerTable';
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
