import * as React from 'react';
import './SptGood.css';
import {ISptStore} from '../../models/SptStore';
import {ISptGoodService, SptGoodService} from '../../services/SptGoodService';
import {Button, Card, CardBody, CardImg, Row} from 'reactstrap';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardText from 'reactstrap/lib/CardText';

const MyCard = (parameters: { goodName: string }) => {
    const goodName = parameters.goodName;
    return (
        <div>
            <Card>
                <CardImg top width="100%"
                         src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                         alt={goodName}/>
                <CardBody>
                    <CardTitle>{goodName}</CardTitle>
                    <CardText>Test</CardText>
                    <Button>Рассчитать</Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default class SptGood extends React.Component <{ sptStore: ISptStore }> {

    private sptGoodService: ISptGoodService = new SptGoodService(this.props.sptStore);

    public render() {

        this.sptGoodService.getGoods();
        this.props.sptStore.sptGoodStore.add('Ванны моечные разборные');
        this.props.sptStore.sptGoodStore.add('Ванны моечные сварные');

        return (
            <div>
                <Row>
                {this.props.sptStore.sptGoodStore.goods.map((good, idx) => <MyCard key={idx} goodName={good.goodName}/>)}
                </Row>
            </div>
        );
    }
}