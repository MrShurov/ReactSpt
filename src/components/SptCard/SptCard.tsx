import * as React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardImg,
    Col, CustomInput,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardText from 'reactstrap/lib/CardText';
import {ISptCalculationService, SptCalculationService} from '../../services/SptCalculationService';
import {ISptStore} from '../../models/SptStore';
import {observer} from 'mobx-react';
import {ISptGoodService, SptGoodService} from '../../services/SptGoodService';

@observer
export default class SptCard extends React.Component <{ sptStore: ISptStore, goodName: string, imageUrl: string, description: string,
    calculationUrl: string, type : string, coefficient : number },
    { modal: boolean, coefficient: number }> {

    private sptCalculationService: ISptCalculationService = new SptCalculationService(this.props.sptStore);
    private sptGoodService: ISptGoodService = new SptGoodService(this.props.sptStore);

    constructor(props: Readonly<{ sptStore: ISptStore, modal: boolean, goodName: string, imageUrl: string, description: string,
        calculationUrl: string, type : string, coefficient : number }>) {
        super(props);
        this.state = {
            coefficient: this.props.coefficient,
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    public handleChangeCoefficient = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({coefficient: parseFloat(event.target.value)});
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
        this.sptGoodService.updateCoefficient(this.state.coefficient, this.props.goodName);
    };

    public render() {
        const bath = (() => {
            return (<Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>
                    Рассчитать стоимость
                </ModalHeader>
                <ModalBody>
                    <div>
                        <Col>
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Col>
                                        <Input placeholder="Количество ванн" autoFocus name="countOfItems" id="countOfItems"/>
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
                            Стоимость: {this.props.sptStore.sptCalculationStore.price}
                        </div>
                    </ModalFooter>
                    : ''
                }
            </Modal>);
        });
        const rack = (() => {
            return (<Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Рассчитать стоимость</ModalHeader>
                <ModalBody>
                    <div>
                        <Col>
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Col>
                                        <Input placeholder="Количество полок" autoFocus name="countOfItems" id="countOfItems"/>
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
                                            <option value="(полки - нерж, стойки - нерж)">(полки - нерж, стойки - нерж)</option>
                                            <option value="(полки - нерж, стойки - оцинк)">(полки - нерж, стойки - оцинк)</option>
                                            <option value="(полки - оцинк, стойки - оцинк)">(полки - оцинк, стойки - оцинк)</option>
                                        </select>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col>
                                        <CustomInput type="checkbox" value="1" id="perforation" name="perforation" label="Перфорация"/>
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
                        <div className="calculationFooter">Стоимость: {this.props.sptStore.sptCalculationStore.price}</div>
                    </ModalFooter>
                    : ''
                }
            </Modal>);
        });
        const table = (() => {
            return (<Modal isOpen={this.state.modal} toggle={this.toggle}>
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
                                            <option value="СП с решётчатой полкой">СП с решётчатой полкой</option>
                                            <option value="СПБ с решётчатой полкой">СПБ с решётчатой полкой</option>
                                            <option value="СПБ со сплошной полкой">СПБ со сплошной полкой</option>
                                            <option value="СПН с решётчатой полкой">СПН с решётчатой полкой</option>
                                            <option value="СПБН с решётчатой полкой">СПБН с решётчатой полкой</option>
                                            <option value="СПН со сплошной полкой">СПН со сплошной полкой</option>
                                            <option value="СПБН со сплошной полкой">СПБН со сплошной полкой</option>
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
                        <div className="calculationFooter">Стоимость: {this.props.sptStore.sptCalculationStore.price}</div>
                    </ModalFooter>
                    : ''
                }
            </Modal>);
        });
        const tableWithStrapping = (() => {
            return (<Modal isOpen={this.state.modal} toggle={this.toggle}>
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
                        <div className="calculationFooter">Стоимость: {this.props.sptStore.sptCalculationStore.price}</div>
                    </ModalFooter>
                    : ''
                }
            </Modal>);
        });

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
                            <div className="d-flex flex-row">
                            <Input
                                className="col-4 text-center myInput"
                                name="coefficient"
                                id="coefficient"
                                onChange={this.handleChangeCoefficient}
                                value={this.state.coefficient}
                            />
                            <Button onClick={() => this.handleSubmitChangeCoefficient()} type="submit" color="success" >Обновить</Button>
                            </div>
                            <Button onClick={this.toggle}>Рассчитать</Button>
                            {this.props.type === 'Ванны'
                                ? bath()
                                : ''
                            }
                            {this.props.type === 'Столы'
                                ? table()
                                : ''
                            }
                            {(this.props.type === 'Стеллажи')
                                ? rack()
                                : ''
                            }
                            {this.props.type === 'Столы c обвязкой'
                                ? tableWithStrapping()
                                : ''
                            }
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}