import * as React from 'react';
import './SptBody.css';
import {ISptStore} from '../../models/SptStore';
import SptUser from '../SptUser/SptUser';
import SptLogin from '../SptLogin/SptLogin';
import SptGood from '../SptGood/SptGood';
import {Route, Switch} from 'react-router-dom';

export default class SptBody extends React.Component <{ sptStore: ISptStore }> {

    public render() {
        return (
            <div className="wrapper">
                <Switch>
                    <Route exact path="/user" render={() => (<SptUser/>)}/>
                    <Route exact path="/login" render={() => (<SptLogin/>)}/>
                    <Route exact path="/good" render={() => (<SptGood sptStore={this.props.sptStore}/>)}/>
                </Switch>
            </div>
        );
    }
}