import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import './button-submit-form.css';

/*
    Botão para submissão de formulários.
    Propriedades que podem ser recebidas
    {
        variant: 'text' | 'outlined' | 'contained' do materialUI
        classCSS: classe css pra sobrepôr alguma característica
        loading: true or false para carregar a barra circular ou texto
        text: conteúdo dentro do botão
        funcao: o que será executado ao clicar
    }
*/
export default function ButtonSubmitForm({ variant, classCSS, loading, text, funcao }) {

    return (
        <Button variant={variant ? variant : "contained"} 
            fullWidth 
            className={"btn-form " + classCSS} 
            onClick={!loading ? funcao : () => {}}
        >
            {loading ? <CircularProgress classes="color-circular" disableShrink size="1.7em" /> : text}
        </Button>
    );
}

