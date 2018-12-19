import * as React from 'react';
import './SptHeaderElement.css';
import {ISptStore} from '../../models/SptStore';
import {BrowserMode} from '../../models/SptCurrentStore';



export default class SptHeaderElement extends React.Component <{sptStore: ISptStore, item : BrowserMode}/*,{active: boolean}*/> {

    constructor(props: Readonly<{sptStore: ISptStore, item : BrowserMode}>) {
        super(props);
        /*this.state = {
            active: false,
        };*/
    }

    public render() {
        return (
            <li /*className={this.state.active ? 'activeElement': ''}*/
                onClick={() => {
                    this.props.sptStore.current.setMode(this.props.item);
                    /*this.setState({ active: true });*/
                }}>
                {this.props.item}
            </li>);
    }
}