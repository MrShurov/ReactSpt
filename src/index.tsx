import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SptHeader from './components/SptHeader';
import {BrowserRouter} from 'react-router-dom';
import {ISptStore, SptStore} from './models/SptStore';
import registerServiceWorker from './registerServiceWorker';
import SptBody from './components/SptBody/SptBody';


const sptStore: ISptStore = SptStore.create({
    sptGoodStore: {
        good: []
    },
    sptUserStore:{

    }
});

class App extends React.Component <{ sptStore: ISptStore }>{

    public render() {
        return (
            <div>
                <SptHeader/>
                <SptBody sptStore={this.props.sptStore}/>
            </div>
        );
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App sptStore={sptStore}/>
    </BrowserRouter>, document.getElementById('root') as HTMLElement);
registerServiceWorker();
