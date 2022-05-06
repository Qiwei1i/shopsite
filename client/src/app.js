import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/home";
import Clothes from './components/clothes';

import "./index.css";
import Cart from "./components/cart";
import ShopService from "./services/shopservice";
import SignIn from "./components/signin";
import Orders from "./components/orders";
import ClothesDetail from "./components/clothes/clothesdetail";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: false,
            clothes: null
        };
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.userChanged = this.userChanged.bind(this);
        this.addToCart = this.addToCart.bind(this);
    };

    componentDidMount() {
        this.signIn();
    };

    signIn(username, password) {
        ShopService.signin(username, password).then(user => {
            if (!!user && !!user.login) {
                this.setState({user: user});
            }
        });
    };

    signOut() {
        ShopService.signout().then(user => {
            if (!!user && !!user.login) {
                this.setState({user: false});
            }
        });
    };

    userChanged(user) {
        this.setState({user: user});
    };

    addToCart(clothes) {
        if (!!this.state.user) {
            ShopService.addToCart(clothes).then(user => {
                this.setState({user: user});
            });
        }
    };

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home loginUser={this.state.user} 
                        signOut={this.signOut} addToCart={this.addToCart} />} />
                    <Route path="/men" element={<Clothes adaptFor="men" loginUser={this.state.user} userChanged={this.userChanged}
                        signOut={this.signOut} addToCart={this.addToCart} />} />
                    <Route path="/women" element={<Clothes adaptFor="women" loginUser={this.state.user} userChanged={this.userChanged}
                        signOut={this.signOut} addToCart={this.addToCart} />} />
                    <Route path="/clothes/:id" element={<ClothesDetail loginUser={this.state.user} userChanged={this.userChanged}
                        signOut={this.signOut} addToCart={this.addToCart} />} />
                    <Route path="/cart" element={<Cart cart={this.state.cart} loginUser={this.state.user} userChanged={this.userChanged}
                        signOut={this.signOut} />} />
                    <Route path="/signin" element={<SignIn loginUser={this.state.user} signIn={this.signIn} signOut={this.signOut} />} />
                    <Route path="/orders" element={<Orders loginUser={this.state.user} signOut={this.signOut} />} />
                </Routes>
            </BrowserRouter>
        );
    }
}