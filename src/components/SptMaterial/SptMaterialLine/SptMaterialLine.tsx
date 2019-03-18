import * as React from 'react';
import './SptMaterialLine.css';
import {Button, Input} from 'reactstrap';
import {observer} from 'mobx-react';
import {ISptStore} from '../../../models/SptStore';
import {ISptMaterialService, SptMaterialService} from '../../../services/SptMaterialService';


@observer
export default class SptMaterialLine extends React.Component <{
    sptStore: ISptStore, id: number, materialName: string, measure: string,
    price: number
}, { price: string }> {

    private sptMaterialService: ISptMaterialService = new SptMaterialService(this.props.sptStore);

    constructor(props: Readonly<{ sptStore: ISptStore, id: number, materialName: string, measure: string, price: number }>) {
        super(props);
        this.state = {
            price: ''
        };
    }

    public handleSubmit = () => {
        this.sptMaterialService.updateMaterial(parseFloat(this.state.price), this.props.materialName);
    };

    public handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({price: event.target.value});
    };

    public render() {
        return (
            <tr>
                <th scope="row">{this.props.id}</th>
                <td>{this.props.materialName}</td>
                <td align="center">{this.props.measure}</td>
                <td align="center">{this.props.price}</td>
                <td align="center">
                    <Input
                        className="col-4 text-center myInput"
                        type="number"
                        name="price"
                        id="price"
                        onChange={this.handleChangePrice}
                        value={this.state.price}
                    />
                </td>
                <td>
                    <Button onClick={() => this.handleSubmit()} type="submit" color="success">Обновить</Button>
                </td>
            </tr>
        );
    }
}