import * as React from 'react';
import './SptBody.css';
import {ISptStore} from '../../models/SptStore';
import SptUser from '../SptUser/SptUser';
import SptLogin from '../SptLogin/SptLogin';
import SptGood from '../SptGood/SptGood';
import {observer} from 'mobx-react';
import SptMaterial from '../SptMaterial';

@observer
export default class SptBody extends React.Component <{ sptStore: ISptStore }> {

    public render() {
        return (
            <div className="wrapper">
                {this.props.sptStore.current.mode === 'Пользователи'
                    ? <SptUser sptStore={this.props.sptStore}/>
                    : ''
                }
                {this.props.sptStore.current.mode === 'Вход'
                    ? <SptLogin sptStore={this.props.sptStore}/>
                    : ''
                }
                {this.props.sptStore.current.mode === 'Оборудование'
                    ? <SptGood sptStore={this.props.sptStore}/>
                    : ''
                }
                {this.props.sptStore.current.mode === 'Выход'
                    ? <SptLogin sptStore={this.props.sptStore}/>
                    : ''
                }
                {this.props.sptStore.current.mode === 'Материалы'
                    ? <SptMaterial sptStore={this.props.sptStore}/>
                    : ''
                }
            </div>
        );
    }
}