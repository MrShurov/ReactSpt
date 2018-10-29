import * as React from 'react';
import './SptHeader.css';
import NavItem from 'reactstrap/lib/NavItem';
import {Route, Router, browserHistory} from 'react-router';
import SptLogin from 'src/components/SptLogin';
import SptUser from 'src/components/SptUser';

class SptHeader extends React.Component {
    public render() {
        return (
            <Router history={}>
                <NavItem>
                    <Route path="users" component={SptLogin}/>
                </NavItem>
                <NavItem>
                    <Route path="users" component={SptUser}/>
                </NavItem>
            </Router>);
    }
}

export default SptHeader;