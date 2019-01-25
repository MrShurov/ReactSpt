import * as React from 'react';
import './SptLogin.css';
import {Button, Col, FormGroup, Input} from 'reactstrap';
import RestClient from '../../services/RestClient';
import {SptParserService} from '../../services/SptParserService';
import {AxiosResponse} from 'axios';
import {ISptStore} from '../../models/SptStore';
import {observer} from 'mobx-react';

@observer
export default class SptLogin extends React.Component <{ sptStore: ISptStore }, { username: string, password: string, error: boolean }> {

    private restClient: RestClient;
    private sptParserService: SptParserService;

    constructor(props: Readonly<{ sptStore: ISptStore }>) {
        super(props);
        this.restClient = new RestClient(this.props.sptStore.current.currentUser);
        this.sptParserService = new SptParserService();
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
            return <div className="alert alert-danger">Неверное имя пользователя или пароль</div>;
        }
        return this.props.children;
    }

    public login(form: HTMLFormElement) {
        const requestUrl = '/authentication';
        const data = new FormData(form);
        this.restClient.post(requestUrl, data,
            (response) => {
                this.parseData(response, this.props.sptStore);
            },
            (error) => this.setState({error: true}));
    }

    public logout() {
        if (this.props.sptStore.current.mode === 'Выход') {
            this.props.sptStore.current.setCurrentUser('Anonymous');
            this.props.sptStore.current.setRole('');
            this.props.sptStore.current.setMode('Вход');
        }
    }

    public render() {
        const beforeRender = (() => {
            {
                this.logout();
            }
            return this.props.children;
        });

        return (
            <div>
                <div>
                    {beforeRender()}
                </div>
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

    private parseData(response: AxiosResponse, sptStore: ISptStore) {
        const uuid: string = 'uuid';
        const roles: string = 'roles';
        JSON.stringify(response.data, (key, value) => {
            this.sptParserService.parseArrayOrValue(value, (item: object) => {
                sptStore.current.setCurrentUser(item[uuid]);
                sptStore.current.setRole(item[roles]);
            });
        });
        this.afterLogin();
    }

    private afterLogin() {
        this.props.sptStore.current.setMode('Оборудование');
    }
}