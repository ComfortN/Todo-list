import React from 'react';
import { HashLoader } from 'react-spinners';
import './Loader.css';

const Loader = ({ loading }) => {

  return (
    <div className={`loader-container ${loading ? 'show' : 'hide'}`}>
      <HashLoader size={50} color={"#592E83"} />
    </div>
  );
};

export default Loader;