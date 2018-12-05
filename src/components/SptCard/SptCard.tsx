import * as React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardImg,
    Col,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardText from 'reactstrap/lib/CardText';
import {ISptCalculationService, SptCalculationService} from '../../services/SptCalculationService';


export default class SptCard extends React.Component <{ goodName: string, imageUrl: string, description: string }, { modal: boolean, price: number}> {

    private sptCalculationService: ISptCalculationService = new SptCalculationService();

    constructor(props: Readonly<{ modal: boolean, goodName: string, imageUrl: string, description: string }>) {
        super(props);
        this.state = {
            modal: false,
            price: 0
        };
        this.toggle = this.toggle.bind(this);
    }

    public handleOpen = () => this.setState({modal: true});

    public handleClose = () => this.setState({modal: false});

    public toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    public handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        this.sptCalculationService.calculate(data, this.props.goodName)
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
                            <Button onClick={this.toggle}>Рассчитать</Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader toggle={this.toggle}>Рассчитать стоимость</ModalHeader>
                                <ModalBody>
                                    <div>
                                        <Col>
                                            <form onSubmit={this.handleSubmit}>
                                                <FormGroup>
                                                    <Label for="count" sm={10}>Количество:</Label>
                                                    <Col>
                                                        <Input autoFocus name="count" id="count"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="depth" sm={10}>Глубина:</Label>
                                                    <Col>
                                                        <Input name="depth" id="depth"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="height" sm={10}>Высота:</Label>
                                                    <Col>
                                                        <Input name="height" id="height"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="length" sm={10}>Длинна:</Label>
                                                    <Col>
                                                        <Input name="length" id="length"
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="width" sm={10}>Ширина:</Label>
                                                    <Col>
                                                        <Input name="width" id="width"/>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="type" sm={10}>Тип метала:</Label>
                                                    <Col>
                                                        <Input name="type" id="type"/>
                                                    </Col>
                                                </FormGroup>
                                                <div className="text-center">
                                                    <Button type="submit">Рассчитать</Button>
                                                </div>
                                            </form>
                                        </Col>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.toggle}>Закрыть</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}