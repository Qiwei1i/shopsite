import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: ""
        };
        this.keywordChange = this.keywordChange.bind(this);
        this.searchButtonClick = this.searchButtonClick.bind(this);
        this.signoutButtonClick = this.signoutButtonClick.bind(this);
    };

    keywordChange(event) {
        this.setState({searchKeyword: event.target.value});
    };

    searchButtonClick(event) {
        if (!!this.props.triggerSearch) {
            this.props.triggerSearch(this.state.searchKeyword);
        }
    };

    signoutButtonClick(event) {
        this.props.signOut();
    };

    render() {
        return (
            <div className="header">
                <div className="header-logonav">
                    <Link to="/"><div className="header-logo">ShopSite</div></Link>
                    
                    <nav className="header-navbar">
                        <Link to="/men?adaptFor=men">MEN</Link>
                        <Link to="/women?adaptFor=women">WOMEN</Link>
                    </nav>
                    {this.props.search &&
                    <div className="header-searchbar">
                        <input type="text" value={this.state.searchKeyword} onChange={this.keywordChange} />
                        <button id="searchButton" className="button-primary" onClick={this.searchButtonClick}>Search</button>
                    </div>}
                </div>
                <div className="header-profile">
                    {!this.props.loginUser ?
                    <Link id="signin" to="/signin">signin</Link>
                    :
                    <div className="header-loginuser">
                        <Link to="/cart">
                            <div className="header-cart">{this.props.loginUser.cart.length > 0 ? `cart(${this.props.loginUser.cart.length})` : "cart"}</div>
                        </Link>
                        <div className="header-user">Hi, 
                            <Link to="/orders">{this.props.loginUser.login}</Link>
                        </div>
                        <button id="signout" className="button-secondary" onClick={this.signoutButtonClick}>signout</button>
                    </div>}
                </div>
            </div>
        );
    }
}