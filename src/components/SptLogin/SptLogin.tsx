import * as React from 'react';
import './SptLogin.css';


export default class SptLogin extends React.Component {

    public handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData();
        data.append('username','Shurov');
        data.append('password', 'Secret');
        fetch('http://localhost:8080/login', {
            body: data,
            method: 'POST',
        });
    }

    public render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="text-center">Вход в личный кабинет</h1>
                    <div className="form-group d-flex flex-row justify-content-center">
                        <div className="col-6">
                            <input className="form-control" type="text" name="username" id="username"
                                   placeholder="UserName"/>
                        </div>
                    </div>
                    <div className="form-group d-flex flex-row justify-content-center">
                        <div className="col-6">
                            <input className="form-control" type="password" name="password" id="password"
                                   placeholder="Password"/>
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-center">
                        <input type="submit" className="btn btn-lg btn-primary" value="Вход"/>
                    </div>
                </form>
            </div>
        );
    }
}