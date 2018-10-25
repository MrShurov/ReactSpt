import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import CpcBrowser from './components/CpcBrowser';
import {CpcStore, ICpcStore} from './models/CpcStore';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const cpcStore: ICpcStore = CpcStore.create({
  cpcCartStore: {
    items: ['item 1', 'item 2']
  },
  cpcDataStore: {
    data: '',
    errorMessage: '',
    isLoading: false
  },
  cpcMenuStore: {
    colors: false,
    dates: false,
    flip: false,
    letterNext: 'A01',
    letterPrev: '',
    notes: false,
    references: false,
    state2000Hidden: false,
    state2000Interleaved: false,
    state2000NonInterleaved: false,
    tree: false
  },
  current: {
    cpcSymbol: 'A',
    isTabScheme: true,
    letter: 'Index'
  }
});

class CpcBrowserExample extends React.Component {

  public render() {
    return (
      <div className="CpcBrowserExample">
        <header className="CpcBrowserExampleHeader">
          <h1 className="CpcBrowserExampleTitle">Welcome to CpcBrowser</h1>
        </header>
        <CpcBrowser title="Cooperative Patent Classification" cpcStore={cpcStore}/>
      </div>
    );
  }
}

ReactDOM.render(
  <CpcBrowserExample/>, document.getElementById('root') as HTMLElement);
registerServiceWorker();
