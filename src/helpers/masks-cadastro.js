export function confereNumeroOuBackspace(e){
    return (e.keyCode > 95 && e.keyCode < 106) || e.keyCode === 8 ? true : false;
}

export function maskCPF(tecla, valorAtual){
    let aux = tecla;
    if(tecla === 'Backspace') 
        return valorAtual.toString().substr(0, valorAtual.length - 1);
    if(valorAtual.toString().length === 2) aux = tecla.toString().concat('-');
    if(valorAtual.toString().length === 6) aux = tecla.toString().concat('-');
    if(valorAtual.toString().length === 10) aux = tecla.toString().concat('/');
    if(valorAtual.toString().length === 14) return valorAtual;
    return valorAtual.concat(aux);
}

export function maskTelefone(tecla, valorAtual){
    let aux = tecla;
    if(tecla === 'Backspace') 
        return valorAtual.toString().substr(0, valorAtual.length - 1);
    if(valorAtual.toString().length === 0) aux = '('.concat(tecla.toString());
    if(valorAtual.toString().length === 2) aux = tecla.toString().concat(')');
    if(valorAtual.toString().length === 8) aux = tecla.toString().concat('-');
    if(valorAtual.toString().length === 14) return valorAtual;
    return valorAtual.concat(aux);
}

export function maskCEP(tecla, valorAtual){
    let aux = tecla;
    if(tecla === 'Backspace') 
        return valorAtual.toString().substr(0, valorAtual.length - 1);
    if(valorAtual.toString().length === 4) aux = tecla.toString().concat('-');
    if(valorAtual.toString().length === 9) return valorAtual;
    return valorAtual.concat(aux);
}

export function apenasNumeros(tecla, valorAtual){
    let aux = tecla;
    if(tecla === 'Backspace') 
        return valorAtual.toString().substr(0, valorAtual.length - 1);
    
    return valorAtual.concat(aux);
}

export function apenasAno(tecla, valorAtual){
    let aux = tecla;
    if(tecla === 'Backspace') 
        return valorAtual.toString().substr(0, valorAtual.length - 1);
    
    if(valorAtual.length === 4) return valorAtual;

    return valorAtual.concat(aux);
}