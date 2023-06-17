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
        <div key={props.product.id} className="col-md-2 col-5 card mb-2">
            <div className="w-50 mx-auto mt-1">
                <img
                    src="https://vimeworld.com/images/fluidicon.png"
                    className="mx-auto img-fluid"
                    alt={props.product.title}
                />
            </div>
            <div className="card-body">
                <h5 className="card-title text-truncate">{props.product.title}</h5>
                <h6 className="card-price">{props.product.price} ₽</h6>
            </div>
            <div className="card-footer">
                <button className="btn btn-primary" onClick={handleClick}>Выбрать</button>
            </div>
        </div>
    );
}

export default ProductCard;