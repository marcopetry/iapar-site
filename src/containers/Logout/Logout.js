import React from 'react';
import TelaConfirmacao from '../../components/tela-confirmacao/TelaConfirmacao';

export default function Logout({ history }){

    const cancelar = () => history.push('/menu', history.location.state);

    const confirmar = () => {
        localStorage.removeItem('token');
        history.push('/');
    }

    return (
        <TelaConfirmacao msg="Você tem certeza que deseja sair?" 
            funcaoConfirmar={confirmar} 
            funcaoCancelar={cancelar} 
        />
    );
}