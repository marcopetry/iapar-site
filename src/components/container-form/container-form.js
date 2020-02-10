import React from 'react';
import { Container } from '@material-ui/core';
import './container-form.css';

export default function ContainerForm(props){

    return (
        <Container maxWidth={props.maxWidth} className={"container-form-cadastro " + props.classCSS}>
            {props.children}
        </Container>
    );
}