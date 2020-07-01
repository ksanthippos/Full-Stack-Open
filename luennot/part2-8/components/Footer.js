import React from "react";

const Footer = () => {

    // Reactin tapa kirjoittaa CSS-tyyliä
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={footerStyle}>
            <br/>
            <em>Note app (c) Mikael Rauhala 2020</em>
        </div>
    )
}

export default Footer