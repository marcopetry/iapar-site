import React from 'react';
import './span-erro.css';

export default function SpanErro(props){
    return (
        <div>
            <span className="span-erro">{props.erro}</span>
        </div>
    );
}