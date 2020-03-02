import React, { useEffect, useState } from 'react';
import CadastrarInfoPropriedade from '../containers/CadastrarInfoPropriedade/CadastrarInfoPropriedade';

export default function ControllerInventario({ history }) {
    const [acao, setAcao] = useState('');
    const [infoRetorno, setInfoRetorno] = useState('');
    const setarAcaoComponenteRenderizado = e => setAcao(e);
    const pegarInformacaoComponenteRenderizado = e => setInfoRetorno(e);

    

    if(!localStorage.getItem('token')){
        alert('Você está desconectado. Refaça o login.');
        history.push('/');
    }

    if(acao === 'informar-dados'){
        return (
            <h1>Anta</h1>
        );
    }

    return (
        <CadastrarInfoPropriedade 
            id_propriedade_tecnico={history.location.state.id}
            setarAcao={setarAcaoComponenteRenderizado}
            retornarInfoController={pegarInformacaoComponenteRenderizado}
        />
    );
    
}