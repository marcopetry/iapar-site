import React from 'react';
import './list-item-dashboard.css';

export default function ListItemDashboard(props){

    //muda background do item selecionado
    function listItemClicked(e){
        props.history.push(e);
        const disChecked = document.getElementsByClassName('list-item-checked');
        if(disChecked[0]) {
            disChecked[0].classList.remove('list-item-checked');
        } 
        document.getElementById(e).classList.add('list-item-checked');
    }

    return (
        <ul className="container-list-itens">
            {props.listItens.map(item => {
                return (
                    <li key={item.url} id={item.url} onClick={() => listItemClicked(item.url)}>
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