export function setarErrosBackend(msgErro){
    let erros = [];
    //email é o 8 campo do form
    if(msgErro === 'Email já cadastrado.') {
        for(let i = 0; i < 13; i++)
            i === 8 ?  erros.push(msgErro) : erros.push('');
        return erros;
    }

    //email é o campo 1 no form
    if(msgErro === 'CPF já cadastrado.') {
        for(let i = 0; i < 13; i++)
            i === 1 ?  erros.push(msgErro) : erros.push('');
        return erros;
    }
}