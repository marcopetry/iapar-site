import api from '../services/api'

export async function retornarAnimaisPropriedade(history) {
  const id_propriedade = history?.location?.state?.id_propriedade

  if (!id_propriedade || !localStorage.getItem('token')) {
    history.push('/menu')
    return false
  }

  try {
    const response = await api.get(`animal/${id_propriedade}`, {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
    return response
  } catch (e) {
    return false
  }
}
