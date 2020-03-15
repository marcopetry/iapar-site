import React from 'react'
import './container-main.css'
import logo from '../../assets/logo-iapar.png'
import { Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

/**
 * Componente que envolve todos componentes.
 * Centraliza todos na tela
 * Em alguns casos renderiza a logo junto tela de espera, login e cadastro do técnico
 * propriedades:
 * {
 *      children: componente renderizado dentro
 *      telaEspera: pra saber quando é tela de espera e inserir o logo
 * }
 */
export default function ContainerMain({ children, telaEspera }) {
  const history = useHistory()

  if (telaEspera) {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className="py-4 h-100 w-75 position-absolute ml-20"
      >
        <img src={logo} alt="iapar-logo" />
        {children}
      </Grid>
    )
  }

  if (history.location.pathname !== '/' && history.location.pathname !== '/cadastro') {
    return (
      <>
        <Grid container direction="row" className="h-100 position-abolute">
          {children}
        </Grid>
      </>
    )
  }

  return (
    <Grid container direction="column" justify="space-evenly" alignItems="center" className="py-4 h-100">
      <img src={logo} alt="iapar-logo" />
      {children}
    </Grid>
  )
}
