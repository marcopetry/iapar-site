import React, { useState, useEffect } from 'react'
import { pegarTipoUsuarioAtualizarToken } from '../../services/usuarioAPI'
import ButtonSubmitForm from '../../components/button-submit-form/button-submit-form'
import { retornaObjetosEscolhidos } from '../../helpers/retornaObjetosEscolhidos'
import './PropriedadesAcoes.css'

export default function PropriedadeAcoes({ propriedadesSelecionadas, history, propriedades }) {
  const [tipoUsuario, setTipoUsuario] = useState(null)

  useEffect(() => {
    Usuario()
  }, [])

  async function Usuario() {
    setTipoUsuario(await pegarTipoUsuarioAtualizarToken())
  }

  if (!tipoUsuario) {
    return <></>
  }

  const fazerInventario = () => {
    if (propriedadesSelecionadas.length > 1) {
      alert('Para fazer inventário, selecione apenas uma propriedade.')
      return
    }

    if (propriedadesSelecionadas.length === 0) {
      alert('Você precisa selecionar uma propriedade.')
      return
    }
    const [propriedade] = retornaObjetosEscolhidos(propriedades, propriedadesSelecionadas)
    console.log(propriedade)
    history.push(`/menu/dados-propriedade/${propriedade.id_propriedade_tecnico}`)
  }

  if (tipoUsuario === 'tecnico') {
    return (
      <div className="container-btns-propriedades-cadastradas mx-3">
        <ButtonSubmitForm
          loading={false}
          text="Fazer Inventário"
          funcao={fazerInventario}
          classCSS="w-40 btn-secondary"
        />
        <ButtonSubmitForm
          loading={false}
          text="Ver detalhes"
          funcao={() => alert('Falta implementar')}
          classCSS="w-40"
        />
      </div>
    )
  }
  return <h1 className="position-absolute">Cabação</h1>
}
