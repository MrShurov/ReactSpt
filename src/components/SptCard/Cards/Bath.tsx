import {observer} from 'mobx-react';
import * as React from 'react';
import {ISptStore} from '../../../models/SptStore';
import {ISptCalculationService, SptCalculationService} from '../../../services/SptCalculationService';
import {Button, Col, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

@observer
export default class Bath extends React.Component <{ sptStore: ISptStore, calculationUrl: string, goodName: string, toggle : boolean }
    , { modal: boolean}> {

    private sptCalculationService: ISptCalculationService = new SptCalculationService(this.props.sptStore);

    constructor(props: Readonly<{ sptStore: ISptStore, coefficient: number, calculationUrl: string, goodName: string, toggle : boolean }>) {
        super(props);
        this.state = {
            modal: this.props.toggle,
        };
        this.toggle = this.toggle.bind(this);
    }

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

    public render() {
        return (
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
    }
}