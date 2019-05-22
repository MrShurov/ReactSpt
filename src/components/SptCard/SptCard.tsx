import * as React from 'react';
import {ISptStore} from '../../models/SptStore';
import {observer} from 'mobx-react';
import Bath from './Cards/Bath';
import Table from './Cards/Table';
import Rack from './Cards/Rack';
import TableWithStrapping from './Cards/TableWithStrapping';

@observer
export default class SptCard extends React.Component <{
  sptStore: ISptStore, goodName: string, imageUrl: string, description: string,
  calculationUrl: string, type: string, coefficient: number
}> {


  public render() {
    return (
        <div>
          {this.props.type === 'Ванны'
              ? <Bath coefficient={this.props.coefficient.toString()}
                      calculationUrl={this.props.calculationUrl} sptStore={this.props.sptStore}
                      goodName={this.props.goodName} description={this.props.description}
                      imageUrl={this.props.imageUrl}/>
              : ''
          }
          {this.props.type === 'Столы'
              ? <Table coefficient={this.props.coefficient.toString()}
                       calculationUrl={this.props.calculationUrl} sptStore={this.props.sptStore}
                       goodName={this.props.goodName} description={this.props.description}
                       imageUrl={this.props.imageUrl}/>
              : ''
          }
          {(this.props.type === 'Стеллажи')
              ? <Rack coefficient={this.props.coefficient.toString()}
                      calculationUrl={this.props.calculationUrl} sptStore={this.props.sptStore}
                      goodName={this.props.goodName} description={this.props.description}
                      imageUrl={this.props.imageUrl}/>
              : ''
          }
          {this.props.type === 'Столы c обвязкой'
              ? <TableWithStrapping coefficient={this.props.coefficient.toString()}
                                    calculationUrl={this.props.calculationUrl}
                                    sptStore={this.props.sptStore}
                                    goodName={this.props.goodName}
                                    description={this.props.description}
                                    imageUrl={this.props.imageUrl}/>
              : ''
          }
        </div>
    );
  }
}