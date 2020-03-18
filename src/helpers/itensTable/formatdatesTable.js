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
  listaPropriedades.forEach(element => {
    const { propriedade } = element
    dadosFormatados.push({
      id_propriedade_tecnico: element.id_propriedade_tecnico,
      id: propriedade.id,
      nome_propriedade: propriedade.nome_propriedade,
      data_proxima_visita: formatarData(propriedade.data_proxima_visita),
      nome_proprietario: propriedade.dono_propriedade?.usuario.nome,
      email: propriedade.dono_propriedade.usuario.email,
      telefone: propriedade.dono_propriedade.usuario.telefone,
      cidade: propriedade.dono_propriedade.usuario.cidade
    })
  })
  return dadosFormatados
}
