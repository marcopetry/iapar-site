import add_location from '../../assets/add_location.svg';
import person_add from '../../assets/person_add.svg';
import create from '../../assets/create.svg';
import post_add from '../../assets/format_list.svg';
import undo from '../../assets/undo.svg';
import contacts from '../../assets/contacts.svg';

export const itensTecnico = [
    {
        text: 'Cadastrar Propriedadde',
        url: '/menu/cadastrar-propriedade/cadastrar-proprietario',
        icon: add_location,
    }
];

export const itensCadastrarPropriedade = [
    {
        text: 'Cadastrar proprietário', 
        url: '/menu/cadastrar-propriedade/cadastrar-proprietario',
        icon: person_add
    },
    {
        text: 'Selecionar técnicos', 
        url: '/menu/cadastrar-propriedade/selecionar-tecnicos',
        icon: contacts
    },
    {
        text: 'Cadastrar propriedade', 
        url: '/menu/cadastrar-propriedade/dados-propriedade',
        icon: post_add
    },
    {
        text: 'Inventário de recursos', 
        url: '/menu/cadastrar-propriedade/inventario-recursos',
        icon: create
    },
    {
        text: 'Voltar', 
        url: '/menu',
        icon: undo
    },
]