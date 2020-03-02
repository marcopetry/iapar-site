export function validarInformacoesPropriedade(dados) {
    let erros = [];

    dados.data_insercao === '' ? erros.push('Campo obrigatório.') : erros.push('');
    !dados.qtd_pessoas_envolvidas_atividade ? erros.push('Campo obrigatório e númerico.') : erros.push('');
    !dados.area_total ? erros.push('Campo obrigatório e númerico.') : erros.push('');
    !dados.total_terra_arrendada ? erros.push('Campo obrigatório e númerico.') : erros.push('');
    !dados.area_bovinucultura ? erros.push('Campo obrigatório e númerico.') : erros.push('');
    !dados.area_pasto_perene ? erros.push('Campo obrigatório e númerico.') : erros.push('');
    !dados.area_lavoura_inverno ? erros.push('Campo obrigatório e númerico.') : erros.push('');
    !dados.area_lavoura_verao ? erros.push('Campo obrigatório e númerico.') : erros.push('');
    !dados.preco_medio_terra_nua ? erros.push('Campo obrigatório e númerico.') : erros.push('');
    !dados.preco_medio_arrendamento ? erros.push('Campo obrigatório e númerico.') : erros.push('');
    
    return erros;

}