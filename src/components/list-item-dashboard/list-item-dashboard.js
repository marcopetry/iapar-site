import React, { useEffect } from 'react';
import './list-item-dashboard.css';

export default function ListItemDashboard(props){

    useEffect(() => {
        atualizarLinkAtual();
    }, [props.history.location.pathname]);

    //muda background do item selecionado
    function atualizarLinkAtual(){
        const disChecked = document.getElementsByClassName('list-item-checked');
        if(disChecked[0]) {
            disChecked[0].classList.remove('list-item-checked');
        } 
        const linkAtual = document.getElementById(props.history.location.pathname);
        if(linkAtual){
            linkAtual.classList.add('list-item-checked');
        }
    }

    return (
        <ul className="container-list-itens">
            {props.listItens.map(item => {
                return (
                    <li key={item.url} id={item.url} onClick={() => props.history.push(item.url)} onLoad={atualizarLinkAtual}>
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