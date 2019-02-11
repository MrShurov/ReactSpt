import * as React from 'react';
import './SptGood.css';
import {ISptStore} from '../../models/SptStore';
import {ISptGoodService, SptGoodService} from '../../services/SptGoodService';
import SptCard from '../SptCard/SptCard';
import {CardGroup} from 'reactstrap';
import {observer} from 'mobx-react';

@observer
export default class SptGood extends React.Component <{ sptStore: ISptStore }> {

    private sptGoodService: ISptGoodService = new SptGoodService(this.props.sptStore);

    constructor(props: Readonly<{ sptStore: ISptStore }>) {
        super(props);
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
                <CardGroup>
                    {this.props.sptStore.sptGoodStore.goods.map((good, idx) => <SptCard sptStore={this.props.sptStore}
                                                                                        key={idx}
                                                                                        goodName={good.goodName}
                                                                                        description={good.description}
                                                                                        imageUrl={good.imageUrl}
                                                                                        calculationUrl={good.calculationUrl}
                                                                                        type={good.type}
                                                                                        coefficient={good.coefficient}/>)}
                </CardGroup>
            </div>
        );
    }
}