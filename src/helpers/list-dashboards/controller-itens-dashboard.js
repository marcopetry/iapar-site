import { itensProprietario } from './itens-proprietario';
import { itensTecnico, itensCadastrarPropriedade } from './itens-tecnico';
import { itensDashboardAdm } from './itens-adm';
import { itensInclusoesRapidas } from './itens-inclusoes-rapidas';
import exit from '../../assets/exit.svg';

export default function returnItensDashboard(tipoMenu){
    let itensMenu = [];
    
    switch (tipoMenu) {
        case 'proprietario': {
            itensProprietario.map(item => itensMenu.push(item));
            itensMenu.push({
                text: 'Sair',
                url: '/menu/sair',
                icon: exit,
            });
            break;
        }
        case 'tecnico': {
            itensProprietario.map(item => itensMenu.push(item));
            itensTecnico.map(item => itensMenu.push(item));
            itensMenu.push({
                text: 'Sair',
                url: '/menu/sair',
                icon: exit,
            });
            break;
        }
        case 'admin': {
            itensProprietario.map(item => itensMenu.push(item));
            itensTecnico.map(item => itensMenu.push(item));
            itensDashboardAdm.map(item => itensMenu.push(item));
            itensMenu.push({
                text: 'Sair',
                url: '/menu/sair',
                icon: exit,
            });
            break;
        }
        case 'inclusoes-rapidas': {
            itensInclusoesRapidas.map(item => itensMenu.push(item));
            break;
        }
        case 'cadastrar-propriedade': {
            itensCadastrarPropriedade.map(item => itensMenu.push(item));
            break;
        }
        default: {
            break;
        }
    }
    
    
    return itensMenu;
}

export function defineMenu(tipoUsuario, pathname){
    //verificar o caminho que inseriu na url

    if(tipoUsuario === '') return;

    if(pathname.indexOf('inclusoes-rapidas') !== -1) {
        return 'inclusoes-rapidas';
    }

    if(pathname.indexOf('cadastrar-propriedade') !== -1 && tipoUsuario !== 'proprietario') {
        return 'cadastrar-propriedade';
    }

    if(pathname.indexOf('menu') !== -1) {
        return tipoUsuario;
    }

    return 'Invalido menu';
}