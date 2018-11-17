import * as React from 'react';
import './SptLogin.css';
import {Button, Col, FormGroup, Input, Label} from 'reactstrap';
import RestClient from '../../services/RestClient';

export default class SptLogin extends React.Component <{}, { username: string, password: string, error: boolean }> {

    private restClient: RestClient;

    constructor(props: Readonly<{}>) {
        super(props);
        this.restClient = new RestClient();
        this.state = {
            error: false,
            password: '',
            username: ''};
    }

    public validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    public handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({username: event.target.value});
    };

    public handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password: event.target.value});
    };

    public handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.login(event.currentTarget);
    };

    public errorHandler(){
            if (this.state.error) {
                return <div className="alert alert-danger">Invalid username or password</div>;
            }
            return this.props.children;
        }

    public login(form: HTMLFormElement) {
        const requestUrl = '/login';
        const data = new FormData(form);
        this.restClient.post(requestUrl, data,
            (response) => {
            window.location.replace('http://localhost:3000/good');
            },
            (error) => this.setState({error : true }));
    }

    public render() {
        return (
            <div className="Login">
                <Col md={3}>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username" sm={10}>Username:</Label>
                        <Col sm={10}>
                        <Input
                            autoFocus
                            name="username"
                            id="username"
                            onChange={this.handleChangeUsername}
                            value={this.state.username}
                        />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" sm={2}>Password:</Label>
                        <Col sm={10}>
                        <Input
                            name="password"
                            id="password"
                            onChange={this.handleChangePassword}
                            value={this.state.password}
                            type="password"
                        />
                        </Col>
                    </FormGroup>
                    {this.errorHandler()}
                    <Button
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
                </Col>
            </div>
        );
    }
}