import api from './api'

export async function pegarTipoUsuarioAtualizarToken() {
  try {
    const response = await api.get(`/user/${localStorage.getItem('token')}`)
    localStorage.setItem('token', response?.data?.token)
    return response?.data?.tipo_usuario
  } catch (e) {
    console.log(e)
    return
  }
}
