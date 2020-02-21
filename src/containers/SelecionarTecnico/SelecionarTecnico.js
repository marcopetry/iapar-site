import React, { useState, useEffect } from 'react';
import ContainerMain from '../../components/container-main/container-main';
import ContainerForm from '../../components/container-form/container-form';
import api from '../../services/api';
import ListarInformacoes from '../../components/listarInformacoes/listarInformacoes';
import { headerListTecnicos } from '../../helpers/itensTable/headersTables';
import { formatarDadosTecnico } from '../../helpers/itensTable/formatdatesTable';


export default function SelecionarTecnico() {
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

    }, [])

    return (
        <ContainerMain>
            <ContainerForm classCSS="p-0">
                <ListarInformacoes 
                    infos={tecnicos} 
                    headCells={headerListTecnicos} 
                    rows={tecnicos}
                    title="Selecione técnicos"
                    orderBy="nome"
                />
            </ContainerForm>
        </ContainerMain>
    );
}