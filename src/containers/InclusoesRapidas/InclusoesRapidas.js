import React from 'react'
import FeedbackComButton from '../../components/feedbackComButton/feedbackComButton'

export default function InclusoesRapidas({ history }) {
  if (!history?.location?.state?.id_propriedade) {
    history.push('/menu')
  }
  return (
    <FeedbackComButton
      msg="Selecione na dashboard o tipo de inclusão que deseja fazer."
      textButton="Menu principal"
      funcao={() => history.push('/menu')}
    />
  )
}
