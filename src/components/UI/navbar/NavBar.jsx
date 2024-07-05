import React from 'react';
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <div className="navbar">
            <div className="navbar_items">
                <Link to="/about">About site</Link>
                <Link to="/posts">Posts</Link>
            </div>


        </div>
    );
};

export default NavBar;