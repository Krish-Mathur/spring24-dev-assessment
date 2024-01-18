import React, { useState } from 'react';
import VolunteerTable from './VolunteerTable';
import './App.css';
import LoginButton from './login'
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from './logout';
import Profile from './profile';
import {AuthenticationButton} from './authenticationbutton'


const App = () => {

  const { isAuthenticated, isLoading, user} = useAuth0();

  console.log("isAuth", isAuthenticated )
  console.log("isLoading", isLoading )
  console.log("user", user)
  

  return (
      <div className="App">
        <AuthenticationButton />
        {user?.name ? user.name : "Please login"}

        
        <h1>Volunteer Information</h1>
          <VolunteerTable key = {Date.now()} />
      </div>
  );
}

export default App;
