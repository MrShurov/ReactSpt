import * as React from 'react';
import './SptHeader.css';
import {NavLink} from 'react-router-dom';

export default class SptHeader extends React.Component {
    public render() {
        return (
                <div className="header">
                    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                        <a className="navbar-brand">Личный кабинет</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink exact to="/user"><a className="nav-link">Пользователи</a></NavLink>
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav navbar-right">
                            <li className="nav-item">
                                <NavLink exact to="/login"><a className="nav-link">Войти</a></NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
        );
    }
}