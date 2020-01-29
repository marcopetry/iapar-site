export function validarInformacoesCadastro(dados){
    let erros = [];
    
    //verifica se os campos estão preenchidos
    dados.nome === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    
    dados.cpf === '' ? erros.push('Este campo é obrigatório.') : (
        dados.cpf.length < 14 ? erros.push('CPF inválido.'): erros.push(''));
    
    dados.telefone === '' ? erros.push('Este campo é obrigatório.') : (
        dados.telefone.length < 13 ? erros.push('Telefone inválido.'): erros.push(''));

    dados.cidade === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    
    dados.cep === '' ? erros.push('Este campo é obrigatório.') : (
        dados.cep.length < 9 ? erros.push('CEP inválido.'): erros.push(''));
    
    
    dados.rua === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    dados.numero === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    dados.bairro === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    
    dados.email === '' ? erros.push('Este campo é obrigatório.') : (
        dados.email.indexOf('@') === -1 || dados.email.indexOf('.') === -1 ? erros.push('Email inválido') : erros.push('')
    );
    
    dados.senha === '' ? erros.push('Este campo é obrigatório.') : (
        dados.senha.length < 6 ? erros.push('Senha precisa ter no mínimo 6 caracteres.') : erros.push('')
    );

    dados.tipo_registro === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    dados.registro_profissional === '' ? erros.push('Este campo é obrigatório.') : erros.push('');
    dados.ano_formatura === '' ? erros.push('Este campo é obrigatório.') : erros.push('');

    return erros;
}

