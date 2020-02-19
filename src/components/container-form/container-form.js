import React from 'react';
import { Container } from '@material-ui/core';
import './container-form.css';
import { useHistory } from 'react-router-dom';

export default function ContainerForm(props){
    let defContainer = "";
    const history = useHistory();

    //pros componentes ficarem centralizado quando aparecer dashboard na tela
    history.location.pathname === '/' || history.location.pathname === '/cadastro' ? defContainer = "container-form" : defContainer = "container-form-dash";

    return (
        <div className={defContainer}>
            <Container maxWidth={props.maxWidth} className={"container-form-cadastro " + props.classCSS}>
                {props.children}
            </Container>
        </div>
    );
}