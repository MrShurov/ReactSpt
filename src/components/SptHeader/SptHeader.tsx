import * as React from 'react';
import './SptHeader.css';
import {BrowserMode} from '../../models/SptCurrentStore';
import {ISptStore} from '../../models/SptStore';
import SptHeaderElement from '../SptHeaderElement';

export default class SptHeader extends React.Component <{ sptStore: ISptStore }> {
    public render() {
        const buttons: BrowserMode[] = ['Вход', 'Пользователи', 'Оборудование'];

        const buttonsRender = buttons.map((item) => {
            return (
                <SptHeaderElement key={item} sptStore={this.props.sptStore} item={item}/> );
        });

        return (
            <div className="header">
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <a className="navbar-brand">Личный кабинет</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div id="menu">
                        <ul className="d-flex flex-row align-items-center">
                            {buttonsRender}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}