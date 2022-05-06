import React from "react";

import Header from "./common/header";
import Footer from "./common/footer";
import { Navigate } from "react-router-dom";

export default class Orders extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            !!this.props.loginUser ?
            <div className="page">
                <Header search={false} loginUser={this.props.loginUser} signOut={this.props.signOut} />
                <div className="page-body">
                    <table className="orders">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Order Date</th>
                                <th>Number of items</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.loginUser.orders.map(order => {
                        return (<tr className="order-item" key={order.id}>
                            <td className="order-item-id">{order.id}</td>
                            <td className="order-item-id">{order.createDate}</td>
                            <td className="order-item-count">{order.items.length}</td>
                            <td className="order-item-price">${order.totalPrice}</td>
                        </tr>)        
                        })}
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>
            :
            <Navigate to="/" />
        );
    };
}