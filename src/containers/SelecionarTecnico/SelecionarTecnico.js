import React, { useState, useEffect } from 'react';
import ContainerMain from '../../components/container-main/container-main';
import ContainerForm from '../../components/container-form/container-form';
import api from '../../services/api';
import ListarInformacoes from '../../components/listarInformacoes/listarInformacoes';
import { headerListTecnicos } from '../../helpers/itensTable/headersTables';
import { formatarDadosTecnico } from '../../helpers/itensTable/formatdatesTable';
import FeedbackComButton from '../../components/feedbackComButton/feedbackComButton';


export default function SelecionarTecnico({ history }) {
    const [tecnicos, setTecnicos] = useState([]);

    useEffect(() => {
        async function buscarTecnicos() {
            const response = await api.get('/tecnicos');
            if (response.data.message === 'Problema no carregamento') {
                setTecnicos(response.data.message);
            } else {
                setTecnicos(formatarDadosTecnico(response.data));
            }
        }
        buscarTecnicos();

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

    if(!history.location.state){
        return (
            <FeedbackComButton 
                msg="Você precisa cadastrar um proprietário antes de selecionar técnicos." 
                textButton="Cadastrar proprietário"
                function={() => history.push('/menu/cadastrar-propriedade/cadastrar-proprietario')}
            />
        );
    }

    return (
        <ContainerMain>
            <ContainerForm classCSS="p-0">
                <ListarInformacoes 
                    infos={tecnicos} 
                    headCells={headerListTecnicos} 
                    rows={tecnicos}
                    title="Selecione técnicos"
                    orderBy="nome"
                    function={selecionarTecnicos}
                />
            </ContainerForm>
        </ContainerMain>
    );
}