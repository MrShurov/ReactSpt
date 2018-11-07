import * as React from 'react';
import './SptGood.css';
import {ISptStore} from '../../models/SptStore';
import {ISptGoodService, SptGoodService} from '../../services/SptGoodService';

export default class SptGood extends React.Component <{ sptStore: ISptStore }> {

    private sptGoodService: ISptGoodService = new SptGoodService(this.props.sptStore);

    public getGoods() {
        this.sptGoodService.getGoods();
        return <div>this.props.sptStore.sptGoodStore.goods</div>;
    }

    public render() {

        return (
            <div>
                <button onClick={() => {this.sptGoodService.getGoods();}}>Click me!</button>
                <div>{this.props.sptStore.sptGoodStore.goods}</div>
            </div>
        );
    }
}