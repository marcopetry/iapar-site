export function validarInformacoesCadastro(dados){
    let erros = [];
    
    //verifica se os campos estão preenchidos
    dados.nome === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    dados.cpf === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    dados.telefone === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    dados.cidade === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    dados.cep === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    dados.rua === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    dados.numero === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    dados.bairro === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    dados.email === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    dados.senha === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    dados.tipo_registro === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    dados.registro_profissional === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    dados.ano_formatura === '' ? erros.push('Este campo é obrigatório.') : erros.push('');

    return erros;
}