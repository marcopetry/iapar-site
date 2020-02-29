import React from 'react';
import { Link } from 'react-router-dom';
import './link.css';

/** 
 * Padrão para redirecionar.
 * Propriedades:
 *      text: texto exibido,
 *      url: para onde será redirecionado
 */
export default function LinkRedirect({url, text}) {
    
    return (
        <div className="container-link">
            <Link to={url} className="link">{text}</Link>
        </div>
    );
}