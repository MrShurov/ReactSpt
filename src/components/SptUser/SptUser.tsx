import * as React from 'react';
import './SptUser.css';
import {
    Button,
    Col,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    Table
} from 'reactstrap';
import {ISptStore} from '../../models/SptStore';
import {ISptUserService, SptUserService} from '../../services/SptUserService';
import {observer} from 'mobx-react';

const Line = (parameters: {usermane: string, userId: number}) => {
    const username = parameters.usermane;
    const id = parameters.userId;
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{username}</td>
            <td><Button color="info">Полная информация</Button></td>
        </tr>
    );
};

@observer
export default class SptUser extends React.Component <{ sptStore: ISptStore }, { modal: boolean, username: string, password: string, role: string}> {

    private sptUserService: ISptUserService = new SptUserService(this.props.sptStore);

    constructor(props: Readonly<{sptStore: ISptStore}>) {
        super(props);
        this.state = {
            modal: false,
            password: '',
            role: '',
            username: ''
        };
        this.toggle = this.toggle.bind(this);
    }

    public validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    public handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({username: event.target.value});
    };

    public handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({role: event.target.value});
    };

    public handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password: event.target.value});
    };

    public handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        this.sptUserService.createUser(data);
        this.sptUserService.getUsers();
    };

    public handleOpen = () => this.setState({ modal: true });

    public handleClose = () => this.setState({ modal: false });

    public toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    public render() {
        const beforeRender = (() => {
            this.sptUserService.getUsers();
            return this.props.children;
        });
        return (
            <div>
            <div>{beforeRender()}</div>
            <div>
                <Table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.sptStore.sptUserStore.users.map((user, idx) => <Line key={idx} usermane={user.username} userId={user.userid}/>)}
                    </tbody>
                </Table>
                <Button color="primary" onClick={this.toggle}>Создать пользователя</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Создать пользователя</ModalHeader>
                    <ModalBody>
                        <div className="registration">
                            <Col>
                                <form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Col>
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
                                        <Col>
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
                                    <FormGroup>
                                        <Col>
                                            <select name="role" id="role" className="custom-select">
                                                <option value="">Роль:</option>
                                                <option value="ADMIN">Администратор</option>
                                                <option value="USER">Пользователь</option>
                                            </select>
                                        </Col>
                                    </FormGroup>
                                    <Button
                                        className=""
                                        disabled={!this.validateForm()}
                                        type="submit"
                                    >
                                        Создать
                                    </Button>
                                </form>
                            </Col>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
            </div>
        );
    }
}