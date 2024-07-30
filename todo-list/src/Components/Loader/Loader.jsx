import React from 'react';
import { HashLoader } from 'react-spinners';
import './Loader.css';

const Loader = ({ loading }) => {
  if (!loading) return null; // If not loading, do not render the loader

  return (
    <div className="loader-container">
      <HashLoader size={50} color={"#592E83"} />
    </div>
  );
};

export default Loader;
