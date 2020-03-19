export function retornaObjetosEscolhidos(arrayObjetos, idObjetosSelecionados) {
  return arrayObjetos.filter(objeto => idObjetosSelecionados.some(id => id === objeto.id))
}
