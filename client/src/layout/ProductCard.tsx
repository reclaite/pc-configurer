import React from 'react';
import {getUser, ProductInfo, saveUser} from "../lib/PcApp";

interface ProductProps {
    productType: string,
    product: ProductInfo
}

const ProductCard: React.FC<ProductProps> = (props) => {
    const user = getUser();

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        user.selected[props.productType] = props.product;
        saveUser(user)
    };

    return (
        <div key={props.product.id} className="col-xs-1 col-sm-6 col-md-3 col-lg-2 mb-4 mh-120">
            <div className="card">
                <img
                    src="https://vimeworld.com/images/fluidicon.png"
                    className="mx-auto img-thumbnail card-img-top"
                    alt={props.product.title}
                    style={{width: '150px', height: '150px'}}
                />
                <div className="card-body">
                    <h5 className="card-title">{props.product.title}</h5>
                    <h6 className="card-price">{props.product.price} ₽</h6>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary" onClick={handleClick}>Выбрать</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;