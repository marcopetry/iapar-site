import React, { useState } from 'react';
import './CadastrarInfoPropriedade.css';
import { FormControl, FormGroup, Input, InputLabel, TextField, InputAdornment } from '@material-ui/core';
import ContainerMain from '../../components/container-main/container-main';
import ContainerForm from '../../components/container-form/container-form';
import ButtonSubmitForm from '../../components/button-submit-form/button-submit-form';

export default function CadastrarInfoPropriedade({ history }) {
    const [data_insercao, setData] = useState('');
    const [area_total, setAreaTotal] = useState();
    const [total_terra_arrendada, setTotalTerraArrendada] = useState();
    const [area_bovinucultura, setAreaBovinucultura] = useState();
    const [area_pasto_perene, setAreaPastoPerene] = useState();
    const [area_lavoura_inverno, setAreaLavouraInverno] = useState();
    const [area_lavoura_verao, setAreaLavouraVerao] = useState();
    const [preco_medio_terra_nua, setPrecoMedioTerraNua] = useState();
    const [preco_medio_arrendamento, setPrecoMedioArrendamento] = useState();
    const [qtd_pessoas_envolvidas_atividade, setQtdPessoasEnvolvidas] = useState();
    const [mapa_uso_propriedade, setMapaUso] = useState('');
    /**
     * "id_propriedade_tecnico": 1,
        "token":
     */


    return (
        <ContainerMain>
            <ContainerForm maxWidth="sm">
                <FormGroup row={true} className="container-row-form-info-propriedade">
                    <FormControl margin="dense" className="w-45">
                        <TextField
                            id="data-insercao"
                            label="Data Inscrição"
                            type="date"
                            onChange={e => setData(e.target.value)}
                            value={data_insercao}
                            error={false}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl margin="dense" className="w-45">
                        <InputLabel htmlFor="qtd-pessoas-envolvidas" >Qtd Pessoas Envolvidas</InputLabel>
                        <Input id="qtd-pessoas-envolvidas"
                            onChange={e => setQtdPessoasEnvolvidas(e.target.value)}
                            value={qtd_pessoas_envolvidas_atividade}
                            type="number"
                        />
                    </FormControl>
                    {/* <SpanErro erro={erros[1]} /> */}
                </FormGroup>

                <FormGroup row={true} className="container-row-form-info-propriedade">
                    <FormControl margin="dense" className="w-45">
                        <InputLabel htmlFor="area-total" >Área Total</InputLabel>
                        <Input id="area-total"
                            onChange={e => setAreaTotal(e.target.value)}
                            value={area_total}
                            type="number"
                            endAdornment={<InputAdornment position="start" className="mr-4">ha</InputAdornment>}
                        />
                    </FormControl>
                    <FormControl margin="dense" className="w-45">
                        <InputLabel htmlFor="area-arrendada" >Área Arrendada</InputLabel>
                        <Input id="area-arrendada"
                            onChange={e => setTotalTerraArrendada(e.target.value)}
                            value={total_terra_arrendada}
                            type="number"
                            endAdornment={<InputAdornment position="start" className="mr-4">ha</InputAdornment>}
                        />
                    </FormControl>
                </FormGroup>

                <FormGroup row={true} className="container-row-form-info-propriedade">
                    <FormControl margin="dense" className="w-45">
                        <InputLabel htmlFor="area-bovinucultura" >Área Bovinucultura</InputLabel>
                        <Input id="area-bovinucultura"
                            onChange={e => setAreaBovinucultura(e.target.value)}
                            value={area_bovinucultura}
                            type="number"
                            endAdornment={<InputAdornment position="start" className="mr-4">ha</InputAdornment>}
                        />
                    </FormControl>
                    <FormControl margin="dense" className="w-45">
                        <InputLabel htmlFor="area-pasto-perene" >Área Pasto Perene</InputLabel>
                        <Input id="area-pasto-perene"
                            onChange={e => setAreaPastoPerene(e.target.value)}
                            value={area_pasto_perene}
                            type="number"
                            endAdornment={<InputAdornment position="start" className="mr-4">ha</InputAdornment>}                            
                        />
                    </FormControl>
                </FormGroup>

                <FormGroup row={true} className="container-row-form-info-propriedade">
                    <FormControl margin="dense" className="w-45">
                        <InputLabel htmlFor="area-lavoura-inverno" >Área Lavoura Inverno</InputLabel>
                        <Input id="area-lavoura-inverno"
                            onChange={e => setAreaLavouraInverno(e.target.value)}
                            value={area_lavoura_inverno}
                            type="number"
                            endAdornment={<InputAdornment position="start" className="mr-4">ha</InputAdornment>}
                        />
                    </FormControl>
                    <FormControl margin="dense" className="w-45">
                        <InputLabel htmlFor="area-lavoura-verao" >Área Lavoura Verão</InputLabel>
                        <Input id="area-lavoura-verao"
                            onChange={e => setAreaLavouraVerao(e.target.value)}
                            value={area_lavoura_verao}
                            type="number"
                            endAdornment={<InputAdornment position="start" className="mr-4">ha</InputAdornment>}
                        />
                    </FormControl>
                </FormGroup>

                <FormGroup row={true} className="container-row-form-info-propriedade">
                    <FormControl margin="dense" className="w-45">
                        <InputLabel htmlFor="preco-medio-terra-nua" >Preço Terra Nua</InputLabel>
                        <Input id="preco-medio-terra-nua"
                            onChange={e => setPrecoMedioTerraNua(e.target.value)}
                            value={preco_medio_terra_nua}
                            type="number"
                            startAdornment={<InputAdornment position="start" className="mr-4">R$</InputAdornment>}
                        />
                    </FormControl>
                    <FormControl margin="dense" className="w-45">
                        <InputLabel htmlFor="preco-medio-arrendamento" >Preço Arrendamento</InputLabel>
                        <Input id="preco-medio-arrendamento"
                            onChange={e => setPrecoMedioArrendamento(e.target.value)}
                            value={preco_medio_arrendamento}
                            type="number"
                            startAdornment={<InputAdornment position="start" className="mr-4">R$</InputAdornment>}
                        />
                    </FormControl>

                </FormGroup>
                <FormControl className="w-45 mt-3">
                    <label id="label-mapa-file">Mapa de Uso da Terra</label>
                    <input
                        type="file"
                        id="mapa-uso-terra"
                        onChange={e => setMapaUso(e.target.value)}
                        value={mapa_uso_propriedade}
                        disableUnderline={true}
                        fullWidth={false}
                        text=""
                    />
                </FormControl>
                <ButtonSubmitForm
                    text="Cadastrar"
                    loading={false}
                    funcao={() => alert('Falta implementar')}
                />
            </ContainerForm>
        </ContainerMain>
    );
}