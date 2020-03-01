import React, { useState, useEffect } from 'react';
import ContainerMain from '../../components/container-main/container-main';
import ContainerForm from '../../components/container-form/container-form';
import api from '../../services/api';
import ListarInformacoes from '../../components/listarInformacoes/listarInformacoes';
import { headerListTecnicos } from '../../helpers/itensTable/headersTables';
import { formatarDadosTecnico } from '../../helpers/itensTable/formatdatesTable';
import FeedbackComButton from '../../components/feedbackComButton/feedbackComButton';
import TelaEspera from '../../components/tela-espera/tela-espera';
import Feedback from '../../components/feedback/feedback';


export default function SelecionarTecnico({ history }) {
    const [tecnicos, setTecnicos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function buscarTecnicos() {
            setLoading(true);
            const response = await api.get('/tecnicos', { headers: { 'x-access-token': localStorage.getItem('token')} });
            
            setLoading(false);
            if (response.data.message === 'Problema no carregamento') {
                setTecnicos(response.data.message);
            } else {
                setTecnicos(formatarDadosTecnico(response.data));
            }
        }
        if(history.location.state?.id_proprietario){
            buscarTecnicos();
        }
    }, []);

    //recebe como parãmetro um array com os selecionados na tabela
    const selecionarTecnicos = tecnicosSelecionados => {
        if(tecnicosSelecionados.length === 0){
            alert('Você precisa selecionar os técnicos para a propriedade.');
            return;
        }
        history.push('/menu/cadastrar-propriedade/dados-propriedade', {
            id_proprietario: history.location.state.id_proprietario,
            id_tecnicos: tecnicosSelecionados
        });
    };

    if(loading){
        return (
            <TelaEspera mensagem="Estamos carregando suas informações ..."/>
        );
    }

    if(!history.location.state?.id_proprietario){
        return (
            <FeedbackComButton 
                msg="Você precisa cadastrar um proprietário antes de selecionar técnicos." 
                textButton="Cadastrar proprietário"
                funcao={() => history.push('/menu/cadastrar-propriedade/cadastrar-proprietario')}
            />
        );
    }

    if((tecnicos === 'Problema no carregamento' || tecnicos.length === 0) && !loading){
        return (
            <Feedback msg={'Problema no carregamento.'} />
        );
    }
    
    return (
        <ContainerMain>
            <ContainerForm classCSS="p-0">
                <ListarInformacoes 
                    headCells={headerListTecnicos} 
                    rows={tecnicos}
                    title="Selecione técnicos"
                    orderByProp="nome"
                    funcao={selecionarTecnicos}
                />
            </ContainerForm>
        </ContainerMain>
    );
}