import * as React from 'react';
import './SptBody.css';
import {ISptStore} from '../../models/SptStore';
import SptUser from '../SptUser/SptUser';
import SptLogin from '../SptLogin/SptLogin';
import SptGood from '../SptGood/SptGood';
import {observer} from 'mobx-react';

@observer
export default class SptBody extends React.Component <{ sptStore: ISptStore }> {

    public render() {
        return (
            <div className="wrapper">
                {this.props.sptStore.current.mode === 'user'
                    ? <SptUser sptStore={this.props.sptStore}/>
                    : ''
                }
                {this.props.sptStore.current.mode === 'login'
                    ? <SptLogin/>
                    : ''
                }
                {this.props.sptStore.current.mode === 'goods'
                    ? <SptGood sptStore={this.props.sptStore}/>
                    : ''
                }
            </div>
        );
    }
}