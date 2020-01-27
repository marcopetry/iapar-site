import React from 'react';

export default function SpanErro(props){
    return (
        <div>
            <span style={{position: "absolute"}}>{props.erro}</span>
        </div>
    );
}