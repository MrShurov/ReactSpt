import * as React from 'react';
import {observer} from 'mobx-react';
import {ISptStore} from '../../models/SptStore';
import {ISptMaterialService, SptMaterialService} from '../../services/SptMaterialService';
import {Table} from 'reactstrap';
import SptMaterialLine from './SptMaterialLine';

@observer
export default class SptMaterial extends React.Component <{ sptStore: ISptStore }> {

    private sptMaterialService: ISptMaterialService = new SptMaterialService(this.props.sptStore);

    constructor(props: Readonly<{ sptStore: ISptStore }>) {
        super(props);
    }


    public render() {
        const beforeRender = (() => {
            this.sptMaterialService.getMaterial();
            return this.props.children;
        });

        return (
            <div>
                <div>{beforeRender()}</div>
                <div>
                    <Table>
                        <thead>
                        <tr>
                            <th>Номер</th>
                            <th>Название материала</th>
                            <th className="text-center">Единицы измерения</th>
                            <th className="text-center">Цена</th>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.sptStore.sptMaterialStore.materials.map((material, idx) => <SptMaterialLine
                            key={idx}
                            sptStore={this.props.sptStore}
                            id={material.materialId}
                            materialName={material.materialName}
                            measure={material.measure}
                            price={material.price}/>)}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}