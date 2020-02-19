import React from 'react';
import FeedbackComButton from '../feedbackComButton/feedbackComButton';


export default function Teste({history}) {
    
    return (
        <FeedbackComButton textButton="Avançar"
            msg="Cadastro realizado com sucesso. O proprietário precisa acessar o email dele para confirmar seu cadastro."
            function={() => history.push('/menu/cadastrar-propriedade/selecionar-tecnicos')}
        />
    );
}