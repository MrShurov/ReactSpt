import * as React from 'react';
import {Button, Card, CardBody, CardImg, Col, FormGroup, Input, Modal, ModalFooter, ModalHeader,} from 'reactstrap';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardText from 'reactstrap/lib/CardText';
import {ISptCalculationService, SptCalculationService} from '../../../services/SptCalculationService';
import {ISptStore} from '../../../models/SptStore';
import {observer} from 'mobx-react';
import {ISptGoodService, SptGoodService} from '../../../services/SptGoodService';
import ModalBody from 'reactstrap/lib/ModalBody';

@observer
export default class SptCard extends React.Component <{
    sptStore: ISptStore, goodName: string, imageUrl: string, description: string,
    calculationUrl: string, coefficient: string
},
    { modal: boolean, coefficient: string}> {

    private sptCalculationService: ISptCalculationService = new SptCalculationService(this.props.sptStore);
    private sptGoodService: ISptGoodService = new SptGoodService(this.props.sptStore);

    constructor(props: Readonly<{
        sptStore: ISptStore, modal: boolean, goodName: string, imageUrl: string, description: string,
        calculationUrl: string, coefficient: string
    }>) {
        super(props);
        this.state = {
            coefficient: this.props.coefficient,
            modal: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    public handleChangeCoefficient = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({coefficient: event.target.value});
    };

    public handleOpen = () => this.setState({modal: true});

    public handleClose = () => this.setState({modal: false});

    public toggle() {
        this.setState({
            modal: !this.state.modal
        });
        this.props.sptStore.sptCalculationStore.setPrice(0);
    }

    public handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        this.sptCalculationService.calculate(data, this.props.calculationUrl);
    };

    public handleSubmitChangeCoefficient = () => {
        this.sptGoodService.updateCoefficient(parseFloat(this.state.coefficient), this.props.goodName);
        this.props.sptStore.sptGoodStore.changeCoefficient(this.props.goodName, parseFloat(this.state.coefficient));
    };

    public render() {
        return (
            <div>
                <Card>
                    <CardImg top width="100%"
                             src={this.props.imageUrl}
                             alt={this.props.goodName}/>
                    <CardBody>
                        <CardTitle>{this.props.goodName}</CardTitle>
                        <div className="scroll-text">
                            <CardText>{this.props.description}</CardText>
                        </div>
                        <div className="text-center">
                            {this.props.sptStore.current.role === 'ADMIN'
                                ? <div>
                                    <div className="d-flex justify-content-center">
                                        <Input
                                            className="col-4 text-center myInput"
                                            name="coefficient"
                                            type="number"
                                            id="coefficient"
                                            onChange={this.handleChangeCoefficient}
                                            value={this.state.coefficient}
                                        />
                                        <Button onClick={() => this.handleSubmitChangeCoefficient()} type="submit"
                                                color="success">Обновить</Button>
                                    </div>
                                </div>
                                : ''}
                            <Button className="resultBtn" onClick={this.toggle}>Рассчитать</Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader toggle={this.toggle}>Рассчитать стоимость</ModalHeader>
                                <ModalBody>
                                    <div>
                                        <Col>
                                            <form onSubmit={this.handleSubmit}>
                                                <FormGroup>
                                                    <Col>
                                                        <Input placeholder="Высота" name="height" id="height"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col>
                                                        <Input placeholder="Длинна" name="length" id="length"
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col>
                                                        <Input placeholder="Ширина" name="width" id="width"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col>
                                                        <select name="type" id="type" className="custom-select">
                                                            <option value="">Тип стола:</option>
                                                            <option value="СП с обвязкой">СП с обвязкой</option>
                                                            <option value="СПБ с обвязкой">СПБ с обвязкой</option>
                                                            <option value="СПН с обвязкой">СПН с обвязкой</option>
                                                            <option value="СПБН с обвязкой">СПБН с обвязкой</option>
                                                        </select>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col>
                                                        <Input placeholder="Количество" name="count" id="count"/>
                                                    </Col>
                                                </FormGroup>
                                                <div className="text-center">
                                                    <Button type="submit">Рассчитать</Button>
                                                </div>
                                            </form>
                                        </Col>
                                    </div>
                                </ModalBody>
                                {this.props.sptStore.sptCalculationStore.price !== 0
                                    ? <ModalFooter className="justify-content-between">
                                        <div
                                            className="calculationFooter">Стоимость: {this.props.sptStore.sptCalculationStore.price}</div>
                                    </ModalFooter>
                                    : ''
                                }
                            </Modal>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}