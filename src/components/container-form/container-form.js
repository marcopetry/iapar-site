import React from 'react';
import { Container } from '@material-ui/core';
import './container-form.css';
import { useHistory } from 'react-router-dom';
/**
 * Componente que fica envolto de todos os formulários 
 * e apresentações de dados. Centralizado e com bordas padrão.
 * Ajusta-se a presença da dashboard pelo history (url)
 * recebe como propriedades: 
 * {    
 *      maxWidth: xs, sm, md, lg, xg
 *      classCSS: alguma classe css pra sobrepôr alguma característica. Geralmente tira-se o padding para alguns componentes
 *      children: componente que vai dentro
 * }
 */
export default function ContainerForm({maxWidth, classCSS, children}){
    let defContainer = "";
    const history = useHistory();

    //pros componentes ficarem centralizado quando aparecer dashboard na tela
    history.location.pathname === '/' || history.location.pathname === '/cadastro' ? 
        defContainer = "container-form" : defContainer = "container-form-dash";

    return (
        <div className={defContainer}>
            <Container maxWidth={maxWidth} className={"container-form-cadastro " + classCSS}>
                {children}
            </Container>
        </div>
    );
}