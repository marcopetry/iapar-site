import React from 'react'
import ButtonSubmitForm from '../../components/button-submit-form/button-submit-form'
import { retornaObjetosEscolhidos } from '../../helpers/retornaObjetosEscolhidos'
import './PropriedadesAcoes.css'

export default function PropriedadeAcoes({ propriedadesSelecionadas, history, propriedades, tipoUsuario }) {
  function validarQtdPropriedadeSelecionada() {
    if (propriedadesSelecionadas.length > 1) {
      alert('Selecione apenas uma propriedade.')
      return false
    }

    if (propriedadesSelecionadas.length === 0) {
      alert('Você precisa selecionar uma propriedade.')
      return false
    }
    return true
  }

  const inclusoesRapidas = () => {
    if (!validarQtdPropriedadeSelecionada()) {
      return
    }
    history.push(`/menu/inclusoes-rapidas`, { id_propriedade: propriedadesSelecionadas[0] })
  }

  const fazerInventario = () => {
    if (!validarQtdPropriedadeSelecionada()) {
      return
    }
    const [propriedade] = retornaObjetosEscolhidos(propriedades, propriedadesSelecionadas)
    console.log(propriedade)
    history.push(`/menu/dados-propriedade/${propriedade.id_propriedade_tecnico}`)
  }

  if (tipoUsuario === 'tecnico' || tipoUsuario === 'admin') {
    return (
      <div className="container-btns-propriedades-cadastradas mx-3">
        <ButtonSubmitForm
          loading={false}
          text="Ver detalhes"
          funcao={() => alert('Falta implementar')}
          classCSS="w-40 btn-secondary"
        />
        <ButtonSubmitForm
          loading={false}
          text="Inclusões rápidas"
          funcao={inclusoesRapidas}
          classCSS="w-40 btn-secondary"
        />
        <ButtonSubmitForm loading={false} text="Fazer Inventário" funcao={fazerInventario} classCSS="w-40" />
      </div>
    )
  }
  return (
    <div className="container-btns-propriedades-cadastradas mx-3">
      <ButtonSubmitForm
        loading={false}
        text="Ver detalhes"
        funcao={() => alert('Falta implementar')}
        classCSS="w-40 btn-secondary"
      />
      <ButtonSubmitForm loading={false} text="Inclusões rápidas" funcao={inclusoesRapidas} classCSS="w-40" />
    </div>
  )
}
