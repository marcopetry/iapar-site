import React, { useEffect } from 'react';
import './list-item-dashboard.css';

/**
 * Cuida da navegação e aparência da dashboard, mudando a url e persistindo 
 * alguma coisa que estiver no history location state
 * Propriedades:
 *      history: recebe o history para navegar e marcar o item usado,
 *      listItens: itens que serão renderizados. É um array com json, 
 * arquivo está nos helpers
 */
export default function ListItemDashboard({history, listItens}){

    useEffect(() => {
        atualizarLinkAtual();
    }, [history.location.pathname]);

    //muda background do item selecionado
    function atualizarLinkAtual(){
        const disChecked = document.getElementsByClassName('list-item-checked');
        if(disChecked[0]) {
            disChecked[0].classList.remove('list-item-checked');
        } 
        const linkAtual = document.getElementById(history.location.pathname);
        if(linkAtual){
            linkAtual.classList.add('list-item-checked');
        }
    }

    return (
        <ul className="container-list-itens">
            {listItens.map(item => {
                return (
                    <li key={item.url} id={item.url} onClick={() => history.push(item.url, history.location.state)} onLoad={atualizarLinkAtual}>
                        <div>
                            <img src={item.icon} alt="dashboard-iapar"/>
                        </div>
                        <div className="container-text-dashboard">
                            <span>{item.text}</span>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}