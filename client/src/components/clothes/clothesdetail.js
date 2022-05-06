import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShopService from "../../services/shopservice";

import Footer from "../common/footer";
import Header from "../common/header";

import "./clothes.css";

export default function ClothesDetail(props) {
    let { id } = useParams();
    
    const [value, setValue] = useState({
        loaded: false,
        clothes: null
    });

    useEffect(() => {
        ShopService.getClothes([{id: Number(id)}]).then(clothes => {
            if (clothes.length > 0)
                setValue({clothes: clothes[0], loaded: true});
        });
    }, []);
    

    return (
        <div className="page">
            <Header search={false} loginUser={props.loginUser}
                    signOut={props.signOut} />
            <div className="page-body">
            {value.loaded && null !== value.clothes ?
                <div className="clothes-detail">
                    <div className="clothes-title">
                        <div className="clothes-title-left">
                            <div className="clothes-title-name">Name: {value.clothes.name}</div>
                            <div className="clothes-title-description">Description: {value.clothes.description}</div>
                            <div className="clothes-title-brand">Brand: {value.clothes.brand}</div>
                            <div className="clothes-title-category">Category: {value.clothes.category}</div>
                            <div className="clothes-title-price">Price: ${value.clothes.price}</div>
                        </div>
                        <div className="clothes-title-right">
                            <button className="button-primary" onClick={() => props.addToCart(value.clothes)}>Add to cart</button>
                        </div>
                    </div>
                    <div className="clothes-images">
                        {value.clothes.pictures.map(pic => 
                        <div className="clothes-image" key={pic}>
                            <img src={`/images/${pic}`} />
                        </div>
                        )}
                    </div>
                </div> :
                <div />}
            </div>
            <Footer />
        </div>
    );
}