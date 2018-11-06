import * as React from 'react';
import './SptGood.css';
import {ISptStore} from '../../models/SptStore';
import {ISptGoodService, SptGoodService} from '../../services/SptGoodService';

export default class SptGood extends React.Component <{sptStore: ISptStore}> {

    public sptGoodService: ISptGoodService = new SptGoodService(this.props.sptStore);

    public render() {
        return (
            <div>
            </div>
        );
    }
}