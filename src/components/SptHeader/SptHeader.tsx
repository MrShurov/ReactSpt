import * as React from 'react';
import './SptHeader.css';
import {BrowserMode} from '../../models/SptCurrentStore';
import {ISptStore} from '../../models/SptStore';

export default class SptHeader extends React.Component <{ sptStore: ISptStore }> {
    public render() {
        const buttons: BrowserMode[] = ['login', 'user', 'goods'];

        const buttonsRender = buttons.map((item) => {
            return (
                <div className="nav-link" key={item}
                     onClick={() => {
                         this.props.sptStore.current.setMode(item);
                         global.console.log(this.props.sptStore.current.mode.toString());
                     }}>
                    {item}
                </div>);
        });

        return (
            <div className="header">
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <a className="navbar-brand">Личный кабинет</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        {buttonsRender}
                    </div>
                </nav>
            </div>
        );
    }
}