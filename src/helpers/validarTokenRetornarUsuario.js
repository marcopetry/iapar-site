import api from '../services/api';

export async function validarTokenRetornarUsuario(token, history, setToken){
    const response = await api.get(`/user/${localStorage.getItem('token')}`);
    if(response.data.tipo_usuario === 'Sessão expirada. Efetue login novamente.'){
        localStorage.removeItem('token');
        setToken(null);
    } else {
        localStorage.setItem('token', response.data.token);
        history.push('/menu');
    }
}