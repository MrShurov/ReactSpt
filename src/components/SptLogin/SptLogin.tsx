import * as React from 'react';
import './SptLogin.css';
import {Button, Col, FormGroup, Input} from 'reactstrap';
import RestClient from '../../services/RestClient';

export default class SptLogin extends React.Component <{}, { username: string, password: string, error: boolean }> {

    private restClient: RestClient;

    constructor(props: Readonly<{}>) {
        super(props);
        this.restClient = new RestClient();
        this.state = {
            error: false,
            password: '',
            username: ''
        };
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

    public errorHandler() {
        if (this.state.error) {
            return <div className="alert alert-danger">Invalid username or password</div>;
        }
        return this.props.children;
    }

    public login(form: HTMLFormElement) {
        const requestUrl = 'http://localhost:8080/login';
        const data = new FormData(form);
        this.restClient.post(requestUrl, data,
            (response) => {
                global.console.log(response);
            },
            (error) => this.setState({error: true}));
    }

    public render() {
        return (
            <div>
                <Col className="login" md={3}>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Col sm={15}>
                                <Input
                                    placeholder="Имя пользователя"
                                    autoFocus
                                    name="username"
                                    id="username"
                                    onChange={this.handleChangeUsername}
                                    value={this.state.username}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={15}>
                                <Input
                                    placeholder="Пароль"
                                    name="password"
                                    id="password"
                                    onChange={this.handleChangePassword}
                                    value={this.state.password}
                                    type="password"
                                />
                            </Col>
                        </FormGroup>
                        {this.errorHandler()}
                        <div className="text-center">
                        <Button disabled={!this.validateForm()} type="submit">Войти</Button>
                        </div>
                    </form>
                </Col>
            </div>
        );
    }
}