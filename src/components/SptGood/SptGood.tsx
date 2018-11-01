import * as React from 'react';
import './SptGood.css';
import {ISptStore} from '../../models/SptStore';
import {ISptGoodStore} from '../../models/SptGoodStore';
import {ISptGoodService, SptGoodService} from '../../services/SptGoodService';

export default class SptGood extends React.Component <{sptStore: ISptStore, sptGoodStore: ISptGoodStore}> {

    public sptGoodService: ISptGoodService = new SptGoodService(this.props.sptStore);

    constructor(props: Readonly <{sptStore: ISptStore, sptGoodStore: ISptGoodStore}>) {
        super(props);
    }

    public render() {
        return (
            <div>
                {this.sptGoodService.getGoods}
                {this.props.sptStore.sptGoodStore.goodName}
            </div>
        );
    }
}