import React, {useEffect, useState} from 'react';
import {getUser, saveUser} from "../lib/PcApp";
import {getImages} from "../lib/api";
import {Product} from "../lib/Model";
import {useNavigate} from "react-router-dom";

interface ProductProps {
    productType: string,
    showSelect: boolean,
    product: Product
}

const ProductCard: React.FC<ProductProps> = (props) => {
    const user = getUser();
    const navigate = useNavigate();
    const [images, setImages] = useState<string[]>([]);

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        user.selected[props.productType] = props.product;
        saveUser(user)
        navigate("/build")
    };

    const openProduct: React.MouseEventHandler<HTMLDivElement> = () => {
        navigate(`/view/${props.product.productType.toLowerCase()}/${props.product.id}`)
    };

    const buttonOpenProduct: React.MouseEventHandler<HTMLButtonElement> = () => {
        navigate(`/view/${props.product.productType.toLowerCase()}/${props.product.id}`)
    };

    useEffect(() => {
        getImages(props.product)
            .then((resultImages) => {
                setImages(resultImages);
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });
    }, [props.product, props.product.images]);

    const image = images.length > 0 ? images[0] : "https://vimeworld.com/images/fluidicon.png";

    return (
        <div key={props.product.id}
             className="col-md-4 col-sm-5 col-lg-3 card mb-2">
            <div role="button" onClick={openProduct}>
                <div className="w-50 mx-auto mt-1">
                    <img
                        src={image}
                        className="mx-auto img-fluid"
                        alt={props.product.title}
                    />
                </div>
                <div className="card-body">
                    <h5 className="card-title text-truncate">{props.product.title}</h5>
                    <h6 className="card-price">{props.product.price} ₽</h6>
                </div>
            </div>
            <div className="card-footer">
                {
                    props.showSelect ?
                        <>
                            <button className="btn btn-primary"
                                    onClick={handleClick}>Выбрать
                            </button>
                        </> :
                        <>
                            <button className="btn btn-primary"
                                    onClick={buttonOpenProduct}>Подробнее
                            </button>
                        </>
                }
            </div>
        </div>
    );
}

export default ProductCard;