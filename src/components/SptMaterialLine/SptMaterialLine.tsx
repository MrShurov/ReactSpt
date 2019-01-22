import * as React from 'react';
import './SptMaterialLine.css';
import {ISptStore} from '../../models/SptStore';
import {Button, Input} from 'reactstrap';
import {ISptMaterialService, SptMaterialService} from '../../services/SptMaterialService';
import {observer} from 'mobx-react';


@observer
export default class SptMaterialLine extends React.Component <{sptStore: ISptStore, id: number, materialName: string, measure: string,
    price: number},{price : number}> {

    private sptMaterialService: ISptMaterialService = new SptMaterialService(this.props.sptStore);

    constructor(props: Readonly<{sptStore: ISptStore, id: number, materialName: string, measure: string, price: number}>) {
        super(props);
        this.state = {
            price : 0
        };
    }

    public handleSubmit = () => {
        this.sptMaterialService.updateMaterial(this.state.price, this.props.materialName);
    };

    public handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({price: parseFloat(event.target.value)});
    };

    public render() {
        return (
                <tr>
                    <th scope="row">{this.props.id}</th>
                    <td>{this.props.materialName}</td>
                    <td>{this.props.measure}</td>
                    <td>{this.props.price}</td>
                    <td>
                        <Input
                            name="price"
                            id="price"
                            onChange={this.handleChangePrice}
                            value={this.state.price}
                        />
                    </td>
                    <td>
                        <Button onClick={() => this.handleSubmit()} type="submit" color="success" >success</Button>
                    </td>
                </tr>
        );
    }
}