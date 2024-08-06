import React, { useState, useEffect } from 'react';
import SignUp from './Components/Signup/SignUp';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import './App.css';
import Loader from './Components/Loader/Loader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const timer = setTimeout(() => {
  setIsLoading(false);
}, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      
        <Loader loading={isLoading} />
       {!isLoading && (

        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
