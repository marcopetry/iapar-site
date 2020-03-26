import React, { useEffect, useState } from 'react'
import ContainerMain from '../../../components/container-main/container-main'
import ContainerForm from '../../../components/container-form/container-form'
import { retornarAnimaisPropriedade } from '../../../helpers/retornarAnimaisPropriedade'
import CadastrarAnimal from '../CadastroAnimal/CadastroAnimal'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

export default function CadastroPrenhez({ history }) {
  const [animais, setAnimais] = useState([])
  const [id_animal, setIdAnimal] = useState('Selecione animal')

  useEffect(() => {
    const buscarAnimais = async () => {
      const response = await retornarAnimaisPropriedade(history)
      setAnimais(response.data)
    }
    buscarAnimais()
  }, [history])

  if (id_animal === 'Adicionar') {
    history.push('/menu/inclusoes-rapidas/cadastrar-animal', history.location.state)
  }

  return (
    <ContainerMain>
      <ContainerForm maxWidth="sm">
        <FormControl className="w-45 mr-10">
          <InputLabel id="forragem">Animal</InputLabel>
          <Select
            labelId="Animal"
            id="input-animal"
            value={id_animal}
            onChange={e => {
              setIdAnimal(e.target.value)
            }}
          >
            <MenuItem value="Selecione animal">
              <em>Selecionar animal</em>
            </MenuItem>
            {animais.map(item => {
              return (
                <MenuItem value={item.id}>
                  <em>{item.identificacao_animal}</em>
                </MenuItem>
              )
            })}
            <MenuItem value="Adicionar">
              <em>Adicionar animal +</em>
            </MenuItem>
          </Select>
        </FormControl>
      </ContainerForm>
    </ContainerMain>
  )
}
