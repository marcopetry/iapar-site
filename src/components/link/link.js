import React from 'react';
import { Link } from 'react-router-dom';
import './link.css';

export default function LinkRedirect(props) {
    
    return (
        <div className="container-link">
            <Link to={props.url} className="link">{props.text}</Link>
        </div>
    );
}