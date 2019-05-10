import * as React from 'react';
import {Button, Card, CardBody, CardImg, Col, FormGroup, Input, Modal, ModalFooter, ModalHeader,} from 'reactstrap';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardText from 'reactstrap/lib/CardText';
import {ISptCalculationService, SptCalculationService} from '../../../services/SptCalculationService';
import {ISptStore} from '../../../models/SptStore';
import {observer} from 'mobx-react';
import {ISptGoodService, SptGoodService} from '../../../services/SptGoodService';
import ModalBody from 'reactstrap/lib/ModalBody';
import Fab from '@material-ui/core/Fab';
import {Create} from '@material-ui/icons';

const styles = {
    editButton: {
        bottom: '10px',
        height: '30px',
        position: 'absolute' as 'absolute',
        right: '10px',
        width: '30px'
    },
    icon: {
        height: '15px',
        width: '15px',
    }
};

@observer
export default class SptCard extends React.Component <{
    sptStore: ISptStore, goodName: string, imageUrl: string, description: string,
    calculationUrl: string, coefficient: string
},
    { modal: boolean, coefficient: string,modalCoefficient : boolean }> {

    private sptCalculationService: ISptCalculationService = new SptCalculationService(this.props.sptStore);
    private sptGoodService: ISptGoodService = new SptGoodService(this.props.sptStore);

    constructor(props: Readonly<{
        sptStore: ISptStore, modal: boolean,modalCoefficient : boolean, goodName: string, imageUrl: string, description: string,
        calculationUrl: string, coefficient: string
    }>) {
        super(props);
        this.state = {
            coefficient: this.props.coefficient,
            modal: false,
            modalCoefficient : false
        };
        this.toggle = this.toggle.bind(this);
        this.toggleCoefficient = this.toggleCoefficient.bind(this);
    }

    public toggle() {
        this.setState({
            modal: !this.state.modal
        });
        this.props.sptStore.sptCalculationStore.setPrice(0);
    }

    public toggleCoefficient() {
        this.setState({
            modalCoefficient: !this.state.modalCoefficient
        });
    }

    public handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        this.sptCalculationService.calculate(data, this.props.calculationUrl);
    };

    public handleSubmitChangeCoefficient = (event: React.MouseEvent<HTMLFormElement>) => {
        const coefficient : string = 'coefficient';
        const data = new FormData(event.currentTarget);
        this.sptGoodService.updateCoefficient(Number.parseFloat(data[coefficient]), this.props.goodName);
        this.props.sptStore.sptGoodStore.changeCoefficient(this.props.goodName, Number.parseFloat(data[coefficient]));
        this.setState({coefficient: data[coefficient]});
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
                                    <Fab className="edit_button" onClick={() => {this.toggleCoefficient();}} style={styles.editButton}>
                                        <Create className="edit_icon" style={styles.icon}>edit_icon</Create>
                                    </Fab>
                                    <Modal isOpen={this.state.modalCoefficient} toggle={this.toggleCoefficient}>
                                        <ModalHeader toggle={this.toggleCoefficient}>
                                            Обновить наценку : текущая {this.state.coefficient}
                                        </ModalHeader>
                                        <ModalBody>
                                            <div>
                                                <Col>
                                                    <form onSubmit={this.handleSubmitChangeCoefficient}>
                                                        <FormGroup>
                                                            <Col>
                                                                <Input placeholder="Наценка" autoFocus
                                                                       name="coefficient" id="coefficient"/>
                                                            </Col>
                                                        </FormGroup>
                                                        <div className="text-center">
                                                            <Button type="submit">Обновить</Button>
                                                        </div>
                                                    </form>
                                                </Col>
                                            </div>
                                        </ModalBody>
                                    </Modal>
                                </div>
                                : ''}
                            <Button className="resultBtn" onClick={this.toggle}>Рассчитать</Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader toggle={this.toggle}>
                                    Рассчитать стоимость
                                </ModalHeader>
                                <ModalBody>
                                    <div>
                                        <Col>
                                            <form onSubmit={this.handleSubmit}>
                                                <FormGroup>
                                                    <Col>
                                                        <Input placeholder="Количество ванн" autoFocus
                                                               name="countOfItems" id="countOfItems"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col>
                                                        <Input placeholder="Глубина" name="depth" id="depth"/>
                                                    </Col>
                                                </FormGroup>
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
                                                            <option value="">Тип металла:</option>
                                                            <option value="полимер">Полимер</option>
                                                            <option value="нерж">Нерж</option>
                                                            <option value="оцинк">Оцинк</option>
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
                                        <div className="calculationFooter">
                                            Стоимость: {this.props.sptStore.sptCalculationStore.price} BYN
                                        </div>
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