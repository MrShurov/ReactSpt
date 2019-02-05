import * as React from 'react';
import {Button, Card, CardBody, CardImg, Input,} from 'reactstrap';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardText from 'reactstrap/lib/CardText';
import {ISptCalculationService, SptCalculationService} from '../../services/SptCalculationService';
import {ISptStore} from '../../models/SptStore';
import {observer} from 'mobx-react';
import {ISptGoodService, SptGoodService} from '../../services/SptGoodService';
import Bath from './Cards/Bath';
import Table from './Cards/Table';
import Rack from './Cards/Rack';
import TableWithStrapping from './Cards/TableWithStrapping';

@observer
export default class SptCard extends React.Component <{
    sptStore: ISptStore, goodName: string, imageUrl: string, description: string,
    calculationUrl: string, type: string, coefficient: number
},
    { modal: boolean, coefficient: number, perforation: string }> {

    private sptCalculationService: ISptCalculationService = new SptCalculationService(this.props.sptStore);
    private sptGoodService: ISptGoodService = new SptGoodService(this.props.sptStore);

    constructor(props: Readonly<{
        sptStore: ISptStore, modal: boolean, goodName: string, imageUrl: string, description: string,
        calculationUrl: string, type: string, coefficient: number
    }>) {
        super(props);
        this.state = {
            coefficient: this.props.coefficient,
            modal: false,
            perforation: 'No'
        };
        this.toggle = this.toggle.bind(this);
    }

    public handleChangeCoefficient = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({coefficient: parseFloat(event.target.value)});
    };

    public handlePerforation = () => {
        if (this.state.perforation === 'No') {
            this.setState({perforation: 'Yes'});
        } else {
            this.setState({perforation: 'No'});
        }
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
        if (this.props.type === 'Стеллажи' && this.state.perforation === 'No') {
            data.append('perforation', this.state.perforation);
        }
        this.sptCalculationService.calculate(data, this.props.calculationUrl);
    };

    public handleSubmitChangeCoefficient = () => {
        this.sptGoodService.updateCoefficient(this.state.coefficient, this.props.goodName);
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
                                ? <div className="d-flex justify-content-center">
                                    <Input
                                        className="col-4 text-center myInput"
                                        name="coefficient"
                                        id="coefficient"
                                        onChange={this.handleChangeCoefficient}
                                        value={this.state.coefficient}
                                    />
                                    <Button onClick={() => this.handleSubmitChangeCoefficient()} type="submit" color="success">Обновить</Button>
                                </div>
                                : ''}
                            <Button className="resultBtn" onClick={this.toggle}>Рассчитать</Button>
                            {this.props.type === 'Ванны'
                                ? <Bath calculationUrl={this.props.calculationUrl} sptStore={this.props.sptStore} goodName={this.props.goodName}
                                        toggle={this.state.modal}/>
                                : ''
                            }
                            {this.props.type === 'Столы'
                                ? <Table calculationUrl={this.props.calculationUrl} sptStore={this.props.sptStore} goodName={this.props.goodName}/>
                                : ''
                            }
                            {(this.props.type === 'Стеллажи')
                                ? <Rack calculationUrl={this.props.calculationUrl} sptStore={this.props.sptStore} goodName={this.props.goodName}/>
                                : ''
                            }
                            {this.props.type === 'Столы c обвязкой'
                                ? <TableWithStrapping calculationUrl={this.props.calculationUrl} sptStore={this.props.sptStore} goodName={this.props.goodName}/>
                                : ''
                            }
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}