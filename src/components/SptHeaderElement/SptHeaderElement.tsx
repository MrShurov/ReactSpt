import * as React from 'react';
import './SptHeaderElement.css';
import {ISptStore} from '../../models/SptStore';
import {BrowserMode} from '../../models/SptCurrentStore';



export default class SptHeaderElement extends React.Component <{sptStore: ISptStore, item : BrowserMode}> {

    constructor(props: Readonly<{sptStore: ISptStore, item : BrowserMode, className : string}>) {
        super(props);
    }

    public render() {
        return (
            <li
                onClick={() => {
                    this.props.sptStore.current.setMode(this.props.item);
                }}>
                {this.props.item}
            </li>);
    }
}