export function validatorCadastroPropriedade(dadosPropriedade) {
    let erros = [];
    
    if(!dadosPropriedade.id_proprietario || typeof dadosPropriedade.id_proprietario !== "number"){
        alert('Você teve problemas durante o cadastro do proprietário. Tente de novo ou contate o suporte.');
        return;
    }

    if(dadosPropriedade.id_tecnicos.length === 0){
        alert('Você teve problemas durante a seleção dos técnicos. Tente de novo ou contate o suporte.');
        return;
    }

    dadosPropriedade.nome_propriedade === '' ? erros.push('Campo obrigatório.') : erros.push('');
    dadosPropriedade.data_inicio_programa === '' ? erros.push('Campo obrigatório.') : erros.push('');
    dadosPropriedade.data_proxima_visita === '' ? erros.push('Campo obrigatório.') : erros.push('');
    dadosPropriedade.longitude === '' ? erros.push('Campo obrigatório.') : erros.push('');
    dadosPropriedade.latitude === ''  ? erros.push('Campo obrigatório.') : erros.push('');
    dadosPropriedade.qtd_pessoas_envolvidas_atividade === '' ? erros.push('Campo obrigatório.') : (
        dadosPropriedade.qtd_pessoas_envolvidas_atividade <= 0 ? erros.push('Número inválido.') :
        erros.push('')
    );
    return erros;
}
/* 
function converteStringData(stringData){
    const aux = stringData.split('-');
    return new Date(aux[2], parseInt(aux[1]-1), aux[0]);
} */