import React from "react";
import { Navigate } from "react-router-dom";

import Header from "./common/header";
import Footer from "./common/footer";

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: ""
        };
        this.loginChanged = this.loginChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.signInClicked = this.signInClicked.bind(this);
    };


    loginChanged(event) {
        this.setState({login: event.target.value});
    };

    passwordChanged(event) {
        this.setState({password: event.target.value});
    };

    signInClicked(event) {
        this.props.signIn(this.state.login, this.state.password);
    };

    render() {
        return (!this.props.loginUser ? 
            <div className="page">
                <Header search={false} />
                <div className="page-body">
                    <div className="signin-form">
                        <input type="text" value={this.state.login} onChange={this.loginChanged} />
                        <input type="password" value={this.state.password} onChange={this.passwordChanged} />
                        <button className="button-primary" onClick={this.signInClicked}>Signin</button>
                    </div>
                </div>
                <Footer />
            </div> :
            <Navigate to="/" />
        );
    };
}