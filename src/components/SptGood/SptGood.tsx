import * as React from 'react';
import './SptGood.css';
import {ISptStore} from '../../models/SptStore';
import {ISptGoodService, SptGoodService} from '../../services/SptGoodService';
import {Button, Card, CardBody, CardImg, Row} from 'reactstrap';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardText from 'reactstrap/lib/CardText';

const MyCard = (parameters: { goodName: string, imageUrl : string, description : string }) => {
    const goodName = parameters.goodName;
    const imageUrl = parameters.imageUrl;
    const description = parameters.description;
    return (
        <div>
            <Card>
                <CardImg top width="100%"
                         src={imageUrl}
                         alt={goodName}/>
                <CardBody>
                    <CardTitle>{goodName}</CardTitle>
                    <div className="scroll-text">
                        <CardText>{description}</CardText>
                    </div>
                    <div className="text-center">
                    <Button>Рассчитать</Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default class SptGood extends React.Component <{ sptStore: ISptStore }> {

    private sptGoodService: ISptGoodService = new SptGoodService(this.props.sptStore);

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
                {this.props.sptStore.sptGoodStore.goods.map((good, idx) => <MyCard key={idx} goodName={good.goodName}
                                                                                   description={good.description} imageUrl={good.imageUrl}/>)}
                </Row>
            </div>
        );
    }
}