import add_location from '../../assets/add_location.svg'
import person_add from '../../assets/person_add.svg'
import create from '../../assets/create.svg'
import post_add from '../../assets/format_list.svg'
import undo from '../../assets/undo.svg'
import contacts from '../../assets/contacts.svg'

export const itensTecnico = [
  {
    text: 'Cadastrar Propriedadde',
    url: '/menu/cadastrar-propriedade/cadastrar-proprietario',
    icon: add_location,
    redirect: true
  }
]

export const itensCadastrarPropriedade = [
  {
    text: 'Cadastrar proprietário',
    url: '/menu/cadastrar-propriedade/cadastrar-proprietario',
    icon: person_add,
    redirect: false
  },
  {
    text: 'Selecionar técnicos',
    url: 'selecionar-tecnicos',
    icon: contacts,
    redirect: false
  },
  {
    text: 'Cadastrar propriedade',
    url: 'dados-propriedade',
    icon: post_add,
    redirect: false
  },
  {
    text: 'Inventário de recursos',
    url: 'inventario-recursos',
    icon: create,
    redirect: false
  },
  {
    text: 'Voltar',
    url: '/menu',
    icon: undo,
    redirect: true
  }
]
