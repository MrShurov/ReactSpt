import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SptHeader from './components/SptHeader';


class SptBrowser extends React.Component {

    public render() {
        return (
            <div>
                <SptHeader/>
            </div>
        );
    }
}

ReactDOM.render(
    <SptBrowser/>, document.getElementById('root') as HTMLElement);
