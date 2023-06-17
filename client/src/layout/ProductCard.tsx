import React, {useEffect, useState} from 'react';
import {getUser, ProductInfo, saveUser} from "../lib/PcApp";
import {fetchPost} from "../lib/api";

interface ProductProps {
    productType: string,
    product: ProductInfo
}

async function getImages(product: ProductInfo): Promise<Array<string>> {
    try {
        const response = await fetchPost('/images/get', product);

        return response.data.map((image: ArrayBuffer) => {
            const blob = new Blob([image], {type: 'image/jpeg'});
            return URL.createObjectURL(blob);
        });
    } catch (error) {
        console.error('Ошибка при получении картинок:', error);
        return [];
    }
}

const ProductCard: React.FC<ProductProps> = (props) => {
    const user = getUser();
    const [images, setImages] = useState<string[]>([]);

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        user.selected[props.productType] = props.product;
        saveUser(user)
    };

    useEffect(() => {
        getImages(props.product)
            .then((resultImages) => {
                setImages(resultImages);
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });
    }, [props.product.images]);

    const image = images.length > 0 ? images[0] : "https://vimeworld.com/images/fluidicon.png";

    return (
        <div key={props.product.id} className="col-md-2 col-5 card mb-2">
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
            <div className="card-footer">
                <button className="btn btn-primary" onClick={handleClick}>Выбрать</button>
            </div>
        </div>
    );
}

export default ProductCard;