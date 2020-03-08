export function formatDadosInfoPropriedade(dado) {
  return [
    {
      titulo: 'Data Atualização:',
      info: formatarData(dado.data_insercao)
    },
    {
      titulo: 'Quantidade Pessoas Envolvidas na Atividade:',
      info: dado.preco_medio_terra_nua
    },
    {
      titulo: 'Área Total:',
      info: dado.area_total
    },
    {
      titulo: 'Área Terra Arrendada:',
      info: dado.total_terra_arrendada
    },
    {
      titulo: 'Área Bovinucultura:',
      info: dado.area_bovinucultura
    },
    {
      titulo: 'Área Pasto  Perene:',
      info: dado.area_pasto_perene
    },
    {
      titulo: 'Área Lavoura Inverno:',
      info: dado.area_lavoura_inverno
    },
    {
      titulo: 'Área Lavoura Verão:',
      info: dado.area_lavoura_verao
    },
    {
      titulo: 'Preço Médio Terra Nua:',
      info: dado.preco_medio_terra_nua
    },
    {
      titulo: 'Preço Médio Terra Arrendada:',
      info: dado.preco_medio_arrendamento
    }
  ]
}

function formatarData(data) {
  const dataAux = data.split('-')
  return dataAux[2] + '/' + dataAux[1] + '/' + dataAux[0]
}
