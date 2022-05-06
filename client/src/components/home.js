import React from "react";
import { Link } from "react-router-dom";
import ShopService from "../services/shopservice";

import Footer from "./common/footer";
import Header from "./common/header";

import "./home/home.css";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            brands: {}
        };
    };

    componentDidMount() {
        let brands = {};
        ShopService.getClothes().then(clothes => {
            for (let item of clothes) {
                if (!brands[item.brand]) {
                    brands[item.brand] = [];
                }
                brands[item.brand].push(item);
            }
            this.setState({
                loaded: true,
                brands: brands
            });
        });
    };

    render() {
        return (
            <div className="page">
                <Header search={false} cartCount={this.props.cartCount} loginUser={this.props.loginUser} signOut={this.props.signOut} />
                <div className="page-body">
                    {Object.keys(this.state.brands).map(brand => {
                        return (<div className="brand-grid" key={brand}>
                            <div className="brand-title">{brand}</div>
                            {this.state.brands[brand].map(clothes => {
                                return (
                                <Link to={`/clothes/${clothes.id}`} key={clothes.id}>
                                    <div className="brand-clothes-image">
                                        <img src={`images/${clothes.pictures[0]}`} />
                                    </div>
                                </Link>
                                )
                            })}
                        </div>)
                    })}
                </div>
                <Footer />
            </div>
        );
    };
}