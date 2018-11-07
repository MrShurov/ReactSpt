import * as React from 'react';
import './SptHeader.css';
import {NavLink} from 'react-router-dom';
import {NavItem} from 'reactstrap';

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
                                <NavItem>
                                    <NavLink className="nav-link" exact to="/user">Пользователи</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" exact to="/good">Оборудование</NavLink>
                                </NavItem>
                            </ul>
                        </div>
                        <ul className="navbar-nav navbar-right">
                            <NavItem>
                                <NavLink className="nav-link" exact to="/login">Войти</NavLink>
                            </NavItem>
                        </ul>
                    </nav>
                </div>
        );
    }
}