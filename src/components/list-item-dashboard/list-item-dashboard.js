import React, { useEffect } from 'react'
import './list-item-dashboard.css'

/**
 * Cuida da navegação e aparência da dashboard, mudando a url e persistindo
 * alguma coisa que estiver no history location state
 * Propriedades:
 *      history: recebe o history para navegar e marcar o item usado,
 *      listItens: itens que serão renderizados. É um array com json,
 * arquivo está nos helpers
 */
export default function ListItemDashboard({ history, listItens }) {
  useEffect(() => {
    atualizarLinkAtual()
  }, [history.location.pathname])

  //muda background do item selecionado
  function atualizarLinkAtual(item) {
    if (item?.redirect) {
      history.push(item.url, history.location.state)
    }
    const disChecked = document.getElementsByClassName('list-item-checked')
    if (disChecked[0]) {
      disChecked[0].classList.remove('list-item-checked')
    }
    //const ultimoParteLink = history.location.pathname.split('/')
    let ref = history.location.pathname
    if (history.location.pathname.includes('selecionar-tecnicos')) {
      ref = 'selecionar-tecnicos'
    }

    if (history.location.pathname.includes('dados-propriedade')) {
      ref = 'dados-propriedade'
    }

    if (history.location.pathname.includes('inventario-recursos')) {
      ref = 'inventario-recursos'
    }
    const linkAtual = document.getElementById(ref)
    if (linkAtual) {
      linkAtual.classList.add('list-item-checked')
    }
  }

  return (
    <ul className="container-list-itens">
      {listItens.map(item => {
        return (
          <li key={item.url} id={item.url} onClick={() => atualizarLinkAtual(item)} onLoad={atualizarLinkAtual}>
            <div>
              <img src={item.icon} alt="dashboard-iapar" />
            </div>
            <div className="container-text-dashboard">
              <span>{item.text}</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
