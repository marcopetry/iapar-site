import React, { useEffect, useState } from 'react'
import { headerListPropriedades, headerListPropriedadesProprietario } from '../../helpers/itensTable/headersTables'
import ContainerMain from '../../components/container-main/container-main'
import ContainerForm from '../../components/container-form/container-form'
import ListarInformacoes from '../../components/listarInformacoes/listarInformacoes'
import TelaEspera from '../../components/tela-espera/tela-espera'
import api from '../../services/api'
import PropriedadeAcoes from './PropriedadesAcoes'
import { pegarTipoUsuarioAtualizarToken } from '../../services/usuarioAPI'
import { Alert } from '@material-ui/lab'

export default function({ history }) {
  const [propriedades, setPropriedade] = useState([])
  const [propriedadesSelecionadas, setSelecionados] = useState([])
  const [tipoUsuario, setTipoUsuario] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Usuario()
  }, [])

  useEffect(() => {
    async function buscarPropriedades() {
      console.log('buscou')
      const response = await api.get('/propriedade', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      setPropriedade(response.data)
      setLoading(false)
    }
    buscarPropriedades()
  }, [])

  async function Usuario() {
    setTipoUsuario(await pegarTipoUsuarioAtualizarToken())
  }

  if (!tipoUsuario) {
    return <></>
  }

  const pegarSelecionados = selecionados => setSelecionados(selecionados)

  if (propriedades.length === 0 && loading) {
    return <TelaEspera />
  }
  console.log(propriedades)
  return (
    <ContainerMain>
      <ContainerForm classCSS="p-0">
        {propriedades.length > 0 && (
          <ListarInformacoes
            rows={propriedades}
            orderByProp="data_proxima_visita"
            title="Propriedades Cadastradas"
            headCells={tipoUsuario === 'proprietario' ? headerListPropriedadesProprietario : headerListPropriedades}
            componentAcoes={
              <PropriedadeAcoes
                propriedadesSelecionadas={propriedadesSelecionadas}
                history={history}
                propriedades={propriedades}
                tipoUsuario={tipoUsuario}
              />
            }
            pegarSelecionado={pegarSelecionados}
          />
        )}
        {propriedades.length === 0 && <Alert severity="warning">Você não tem propriedades cadastradas.</Alert>}
      </ContainerForm>
    </ContainerMain>
  )
}

//{rows, orderByProp, title, headCells, funcao}
