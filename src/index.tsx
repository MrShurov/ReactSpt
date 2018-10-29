import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SptHeader from './components/SptHeader';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SptUser from './components/SptUser/SptUser';
import SptLogin from './components/SptLogin/SptLogin';


class SptBrowser extends React.Component {

    public render() {
        return (
            <div>
                <SptHeader/>
                <Switch>
                    <Route exact path="/user" component={SptUser}/>
                    <Route exact path="/login" component={SptLogin}/>
                </Switch>
            </div>
        );
    }
}

ReactDOM.render(
    <BrowserRouter>
        <SptBrowser/>
    </BrowserRouter>, document.getElementById('root') as HTMLElement);
