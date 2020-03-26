import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Cadastro from './containers/Cadastro/Cadastro'
import Login from './containers/Login/Login'
import Autenticacao from './containers/Autenticacao/Autenticacao'
import Dashboard from './containers/Dashboard/Dashboard'
import SelecionarTecnico from './containers/SelecionarTecnico/SelecionarTecnico'
import CadastrarPropriedade from './containers/CadastrarPropriedade/CadastrarPropriedade'
import Logout from './containers/Logout/Logout'
import CadastrarInfoPropriedade from './containers/CadastrarInfoPropriedade/CadastrarInfoPropriedade'
import InfoPropriedade from './containers/InfoPropriedade.js/InfoPropriedade'
import PropriedadesCadastradas from './containers/PropriedadesCadastradas.js/PropriedadesCadastradas'
import Inventario from './containers/Inventario/Inventario'
import InclusoesRapidas from './containers/InclusoesRapidas/InclusoesRapidas'
import CadastrarAnimal from './containers/InclusoesRapidas/CadastroAnimal/CadastroAnimal'
import CompraAnimal from './containers/InclusoesRapidas/CompraAnimal/CompraAnimal'
import CadastroPrenhez from './containers/InclusoesRapidas/CadastroPrenhez/CadastroPrenhez'
import DoencaAnimal from './containers/InclusoesRapidas/DoencaAnimal/DoencaAnimal'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route exact path="/cadastro" component={Cadastro} />
      <Route exact path="/auth/:token" component={Autenticacao} />
      <Route path="/menu" component={Dashboard} />
      <Route exact path="/menu" component={PropriedadesCadastradas} />
      <Route exact path="/menu/cadastrar-propriedade/cadastrar-proprietario" component={Cadastro} />
      <Route
        exact
        path="/menu/cadastrar-propriedade/:id_proprietario/selecionar-tecnicos"
        component={SelecionarTecnico}
      />
      <Route
        exact
        path="/menu/cadastrar-propriedade/:id_proprietario/tecnicos/dados-propriedade"
        component={CadastrarPropriedade}
      />
      <Route
        exact
        path="/menu/cadastrar-propriedade/dados-propriedade/:id_propriedade_tecnico"
        component={CadastrarInfoPropriedade}
      />
      <Route
        exact
        path="/menu/cadastrar-propriedade/inventario-recursos/:id_propriedade_tecnico/:id_info_propriedade"
        component={InfoPropriedade}
      />
      <Route exact path="/menu/dados-propriedade/:id_propriedade_tecnico" component={CadastrarInfoPropriedade} />
      <Route
        exact
        path="/menu/cadastrar-propriedade/inventario-recursos/:id_propriedade_tecnico/:id_info_propriedade/novo"
        component={Inventario}
      />

      <Route exact path="/menu/inclusoes-rapidas" component={InclusoesRapidas} />
      <Route exact path="/menu/inclusoes-rapidas/cadastrar-animal" component={CadastrarAnimal} />
      <Route exact path="/menu/inclusoes-rapidas/compra-animal" component={CompraAnimal} />
      <Route exact path="/menu/inclusoes-rapidas/prenhez" component={CadastroPrenhez} />
      <Route exact path="/menu/inclusoes-rapidas/doencas" component={DoencaAnimal} />
      <Route exact path="/menu/inclusoes-rapidas/inseminacao" component={InclusoesRapidas} />
      <Route exact path="/menu/inclusoes-rapidas/mastite" component={InclusoesRapidas} />
      <Route exact path="/menu/inclusoes-rapidas/medicamentos" component={InclusoesRapidas} />
      <Route exact path="/menu/inclusoes-rapidas/morte-animal" component={InclusoesRapidas} />
      <Route exact path="/menu/inclusoes-rapidas/parto" component={InclusoesRapidas} />
      <Route exact path="/menu/inclusoes-rapidas/venda-animal" component={InclusoesRapidas} />

      <Route exact path="/menu/cadastrar-adm" component={Cadastro} />
      <Route exact path="/menu/cadastrar-tecnico" component={Cadastro} />
      <Route exact path="/menu/teste" component={InfoPropriedade} />
      <Route exact path="/menu/sair" component={Logout} />
    </BrowserRouter>
  )
}
