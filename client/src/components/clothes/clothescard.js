import React from "react";
import { Link } from "react-router-dom";

export default class ClothesCard extends React.Component {
    constructor(props) {
        super(props);
        this.addToCardButtonClick = this.addToCardButtonClick.bind(this);
    };

    addToCardButtonClick(event) {
        if (!!this.props.addToCart) {
            this.props.addToCart(this.props.clothes);
        }
    };

    render() {
        return (
            <div className="clothes-card">
                <Link to={`/clothes/${this.props.clothes.id}`}>
                    <div className="clothes-card-image">
                        <img src={`images/${this.props.image}`} />
                    </div>
                    <div className="clothes-card-info">
                        <div className="clothes-card-info-title">{this.props.title}</div>
                        <div className="clothes-card-info-description">{this.props.description}</div>
                        <div className="clothes-card-info-price">${this.props.price}</div>
                    </div>
                </Link>
                <div className="clothes-card-cart">
                    <button className="button-primary" onClick={this.addToCardButtonClick}>Add to cart</button>
                </div>
            </div>
        );
    };
}