import React from 'react';
import './span-erro.css';

/**
 * Componente para apresentar erros nos formulários antes de enviar.
 * Recece o erro para apresentar.
 */
export default function SpanErro({erro}){
    return (
        <div>
            <span className="span-erro">{erro}</span>
        </div>
    );
}