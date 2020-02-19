import React from 'react';
import { Container } from '@material-ui/core';
import './container-form.css';
import { useHistory } from 'react-router-dom';

export default function ContainerForm(props){
    let margin = "";
    const history = useHistory();

    //pros componentes ficarem centralizado quando aparecer dashboard na tela
    if(history.location.pathname !== '/' && history.location.pathname !== '/cadastro'){
        margin = " m-container-form";
    }

    return (
        <div className={"w-100 " + margin }>
            <Container maxWidth={props.maxWidth} className={"container-form-cadastro " + props.classCSS}>
                {props.children}
            </Container>
        </div>
    );
}