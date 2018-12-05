import * as React from 'react';
import './SptGood.css';
import {ISptStore} from '../../models/SptStore';
import {ISptGoodService, SptGoodService} from '../../services/SptGoodService';
import SptCard from '../SptCard/SptCard';
import {Row} from 'reactstrap';


export default class SptGood extends React.Component <{ sptStore: ISptStore }, {modal: boolean}> {

    private sptGoodService: ISptGoodService = new SptGoodService(this.props.sptStore);

    constructor(props: Readonly<{sptStore: ISptStore}>) {
        super(props);
        this.state = {
            modal: false,
        };
    }

    public render() {
        const beforeRender = (() => {
            this.sptGoodService.getGoods();
            return this.props.children;
        });

        return (
            <div>
                <div>
                    {beforeRender()}
                </div>
                <Row>
                {this.props.sptStore.sptGoodStore.goods.map((good, idx) => <SptCard key={idx} goodName={good.goodName}
                                                                                   description={good.description} imageUrl={good.imageUrl}/>)}
                </Row>
            </div>
        );
    }
}