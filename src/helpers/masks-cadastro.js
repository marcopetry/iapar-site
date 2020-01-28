export function maskCPF(tecla, valorAtual){
    let aux = tecla;
    console.log(tecla);
    //console.log(valorAtual.toString().length);
    if(tecla === 'Backspace') 
        return valorAtual.toString().substr(0, valorAtual.length - 1);
    if(valorAtual.toString().length === 2) aux = tecla.toString().concat('-');
    if(valorAtual.toString().length === 6) aux = tecla.toString().concat('-');
    if(valorAtual.toString().length === 10) aux = tecla.toString().concat('/');
    if(valorAtual.toString().length === 14) return valorAtual;
    return valorAtual.concat(aux);
}

export function teste(tecla, valor){
    console.log(tecla);
    console.log(valor);
}