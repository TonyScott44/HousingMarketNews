import React from "react";

const Header = ({ children }) => (

    <div 
        style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center" }}
        className="jumbotron"
    >
        {children}
    </div>

);

export default Header;