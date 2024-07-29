import React, {useState, useEffect} from 'react';
import { HashLoader } from 'react-spinners';
import './Loader.css';

const Loader = ({ onLoadingComplete }) => {
    const [loading, setLoading] = useState(true);

useEffect(() => {
setLoading(false)
setTimeout(() => {
    setLoading(false);
    if (onLoadingComplete) onLoadingComplete();
}, 3000);
}, [onLoadingComplete]);
return (
    <div className="loader-container">
    {loading && <HashLoader size={50} color={"#592E83"} />}
    </div>
    );
};

export default Loader;
