import React from "react";
import { Navigate } from "react-router-dom";
import ShopService from "../services/shopservice";

import Footer from "./common/footer";
import Header from "./common/header";

import "./cart/cart.css";

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.checkoutButtonClick = this.checkoutButtonClick.bind(this);
    };

    increaseItemCount(clothes) {
        ShopService.addToCart(clothes).then(user => {
            this.props.userChanged(user);
        });
    };

    reduceItemCount(clothes) {
        ShopService.removeFromCart(clothes).then(user => {
            this.props.userChanged(user);
        })
    };

    checkoutButtonClick(event) {
        ShopService.checkoutCart().then(user => {
            this.props.userChanged(user);
        });
    };

    render() {
        let totalPrice = 0;
        if (!!this.props.loginUser) {
            for (let item of this.props.loginUser.cart) {
                totalPrice += Number(item.clothes.price) * Number(item.count);
            }
        }
        return (!!this.props.loginUser ?
            <div className="page">
                <Header search={false} loginUser={this.props.loginUser} signOut={this.props.signOut} />
                <div className="page-body">
                    <div className="cart">
                        {this.props.loginUser.cart.map(item => {
                            return (<div className="cart-item" key={item.clothes.id}>
                                <div className="cart-item-image">
                                    <img src={`images/${item.clothes.pictures[0]}`} />
                                </div>
                                <div className="cart-item-name">{item.clothes.name}</div>
                                <div className="cart-item-price">${item.clothes.price}</div>
                                <div className="cart-item-quant">
                                    <button className="button-secondary" onClick={this.increaseItemCount.bind(this, item.clothes)}>+</button>
                                    <div className="cart-item-count">{item.count}</div>
                                    <button className="button-secondary" onClick={this.reduceItemCount.bind(this, item.clothes)}>-</button>
                                </div>
                                <div className="cart-item-subtotal">Subtotal: ${Number(item.clothes.price) * Number(item.count)}</div>
                            </div>)    
                        })}
                    </div>
                    {totalPrice !== 0 ? 
                        <div className="cart-checkout">
                            <div className="total-price">Total Price: ${totalPrice}</div>
                            <button className="button-primary" onClick={this.checkoutButtonClick}>Checkout</button>
                        </div>
                        :
                        <div className="cart-empty">
                            OOPS! Your cart is empty.
                        </div>}
                </div>
                <Footer />
            </div>
            :
            <Navigate to="/" />
        );
    };
}