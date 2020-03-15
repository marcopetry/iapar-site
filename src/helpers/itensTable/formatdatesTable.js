import { formatarData } from '../formatData'

export function formatarDadosTecnico(listaTecnicos) {
  let dadosFormatados = []
  listaTecnicos.map(tecnico => {
    return dadosFormatados.push({
      id: tecnico.id,
      nome: tecnico.nome,
      email: tecnico.email,
      cidade: tecnico.cidade,
      telefone: tecnico.telefone,
      tipoDoc: tecnico.tecnico.tipo_registro,
      numeroDocumento: tecnico.tecnico.registro_profissional,
      anoFormacao: tecnico.tecnico.ano_formatura
    })
  })
  return dadosFormatados
}

export function formatarDadosPropriedades(listaPropriedades) {
  let dadosFormatados = []
  listaPropriedades.forEach(propriedade => {
    const [dado] = propriedade
    dadosFormatados.push({
      id: dado.id,
      nome_propriedade: dado.nome_propriedade,
      data_proxima_visita: formatarData(dado.data_proxima_visita),
      nome_proprietario: dado.dono_propriedade?.usuario.nome,
      email: dado.dono_propriedade.usuario.email,
      telefone: dado.dono_propriedade.usuario.telefone,
      cidade: dado.dono_propriedade.usuario.cidade
    })
  })
  return dadosFormatados
}
