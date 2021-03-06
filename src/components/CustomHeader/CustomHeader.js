import React from 'react';
import './CustomHeader.css'
import testImg from '../../assets/airplane6.jpg'

function CustomHeader({img ,textLocation, title, text}) {

    const customStyle = {
        "justify-content": textLocation,
        "background-image": `url(${img})`
    }

    return (
            <div className="head-container" style={customStyle}>
                <div className="container">
                    <h1>{title}</h1>
                    <p>{text}</p>
                </div>
                {/* <img src={testImg}></img> */}
            </div>
    );
}

export default CustomHeader;