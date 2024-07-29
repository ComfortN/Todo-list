import SignUp from './Components/Signup/SignUp';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import './App.css';
import React,{useState} from 'react';
import Loader from './Components/Loader/Loader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar/Navbar';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  return (
    <div className="App">
       {isLoading ? (
        <Loader onLoadingComplete={handleLoadingComplete} />
      ) : (
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
      )}
    </div>
    
  );
}

export default App;
