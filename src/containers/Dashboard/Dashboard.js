import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/logo-iapar.png'
import ListItemDashboard from '../../components/list-item-dashboard/list-item-dashboard'
import retornaItensDashboard, { defineMenu } from '../../helpers/list-dashboards/controller-itens-dashboard'
import api from '../../services/api'
import TelaEspera from '../../components/tela-espera/tela-espera'
import { Scrollbars } from 'react-custom-scrollbars'

export default function Dashboard() {
  const history = useHistory()
  const [itensDashboard, setItensDashboard] = useState([])
  const [tipoUsuario, setTipoUsuario] = useState(history.location.state ? history.location.state.tipo_usuario : '')
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [tipoDash, setTipoDash] = useState('')

  useEffect(() => {
    if (!token || !localStorage.getItem('token')) {
      history.push('/')
      return
    }
    async function buscarTipoUsuario() {
      const response = await api.get(`/user/${token}`)
      if (response.data.tipo_usuario === 'Sessão expirada. Efetue login novamente.') {
        history.push('/', { tipo_usuario: 'Sessão expirada. Efetue login novamente.' })
      } else {
        setTipoUsuario(response.data.tipo_usuario)
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
      }
    }
    if (tipoUsuario === '' || tipoUsuario === undefined) {
      buscarTipoUsuario()
      return
    }
    const itensDashboardAux = defineMenu(tipoUsuario, history.location.pathname)
    if (itensDashboardAux === 'Invalido menu') {
      history.push('/menu')
      return
    }
    if (itensDashboardAux !== tipoDash) {
      setTipoDash(itensDashboardAux)
      setItensDashboard(retornaItensDashboard(itensDashboardAux))
    }
  }, [history.location.pathname, tipoDash, tipoUsuario, token, history])

  if (tipoUsuario === '') {
    return <TelaEspera />
  }

  return (
    <div className="container-dashboard">
      <Scrollbars>
        <div className="container-dashboard-logo">
          <img src={logo} alt="iapar-sistema" />
        </div>
        <ListItemDashboard listItens={itensDashboard} history={history} />
      </Scrollbars>
    </div>
  )
}
