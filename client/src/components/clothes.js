import React from "react";

import Footer from "./common/footer";
import Header from "./common/header";
import ClothesCard from "./clothes/clothescard";

import ShopService from "../services/shopservice"

import "./clothes/clothes.css";


export default class Clothes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clothes: []
        };
        this.searchForKeyword = this.searchForKeyword.bind(this);
    };

    componentDidMount() {
        this.getClothes().then(result => {
            this.setState({clothes: result});
        });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.adaptFor !== this.props.adaptFor)
            this.componentDidMount();
    };

    searchForKeyword(keyword) {
        this.getClothes(keyword).then(result => {
            this.setState({clothes: result});
        });
    };

    getClothes(keyword) {
        if (!!keyword) {
            let filters = [{name: keyword}, 
                {description: keyword}, {category: keyword},
                {brand: keyword}];
            for (let filter of filters) {
                filter.adaptfor = this.props.adaptFor;
            }
            return ShopService.getClothes(filters);
        } else if (!!this.props.adaptFor) {
            return ShopService.getClothes([{adaptfor: this.props.adaptFor}]);
        }
        
    };

    render() {
        return (
            <div className="page">
                <Header triggerSearch={this.searchForKeyword} search={true} cartCount={this.props.cartCount} loginUser={this.props.loginUser}
                    signOut={this.props.signOut} />
                <div className="page-body">
                    <div className="clothes-list">
                        {this.state.clothes.map(item => 
                        <ClothesCard image={item.pictures[0]} title={item.name} description={item.description}
                            price={item.price} key={item.id} id={item.id} addToCart={this.props.addToCart} 
                            clothes={item} />)}
                    </div>
                </div>
                <Footer />
            </div>
            
        );
    };
}