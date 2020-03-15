import React from 'react'
import './ApresentarInfosDetalhadas.css'
import ContainerMain from '../container-main/container-main'
import ContainerForm from '../container-form/container-form'

/**
 * Renderiza as informações e mostra opções de ação
 * Propriedades:
 *      dados: Array de json com os dados, devem ser formatados conforme helpers/formatDadosInfoPropriedades
 *      children: container de botoões
 */
export default function ApresentarInfosDetalhadas({ dados, children }) {
  return (
    <ContainerMain>
      <ContainerForm maxWidth="md">
        {dados.map(dado => {
          return (
            <>
              <div className="container-infos-detalhadas">
                <label>{dado.titulo}</label>
                <label>{dado.info}</label>
              </div>
            </>
          )
        })}
        {children}
      </ContainerForm>
    </ContainerMain>
  )
}
