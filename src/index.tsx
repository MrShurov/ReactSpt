import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SptHeader from './components/SptHeader';
import {BrowserRouter} from 'react-router-dom';
import {ISptStore, SptStore} from './models/SptStore';
import registerServiceWorker from './registerServiceWorker';
import SptBody from './components/SptBody/SptBody';
import {applySnapshot, onSnapshot} from 'mobx-state-tree';
import {observer} from 'mobx-react';


const sptStore: ISptStore = SptStore.create({
    current: {
        currentUser: 'Anonymous',
        mode: 'Вход',
        role: 'Anonymous'
    },
    sptCalculationStore: {
        price: 0
    },
    sptGoodStore: {
        goods: []
    },
    sptMaterialStore: {
        materials: []
    },
    sptUserStore: {
        users: []
    }
});

const SptSnapshot = localStorage.cpcStore;
global.console.log(SptSnapshot);
if (SptSnapshot) {
    const json = JSON.parse(SptSnapshot);
    if (SptStore.is(json)) {
        applySnapshot(sptStore, json);
    }
}

@observer
class App extends React.Component <{ sptStore: ISptStore }>{
    public render() {
        return (
            <div>
                <SptHeader sptStore={this.props.sptStore}/>
                <SptBody sptStore={this.props.sptStore}/>
            </div>
        );
    }
}

onSnapshot(sptStore, snapshot => {
    localStorage.setItem('cpcStore', JSON.stringify(snapshot));
});

ReactDOM.render(
    <BrowserRouter>
        <App sptStore={sptStore}/>
    </BrowserRouter>, document.getElementById('root') as HTMLElement);
registerServiceWorker();
