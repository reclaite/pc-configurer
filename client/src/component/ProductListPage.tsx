import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import OuterContainer from "../layout/OuterContainer";
import {fetchApi} from "../lib/api";

const ProductListPage: React.FC = () => {
    const {category} = useParams();
    const [products, setProducts] = useState([]);
    const [errorCaught, setErrorCaught] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchApi(`/products/${category}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Ошибка при получении списка товаров:', error);
                setErrorCaught(true)
            }
        };

        fetchData();
    }, [category]);

    if (errorCaught) {
        return (
            <OuterContainer>
                <h1>Ошибка запроса</h1>
                <p>Сервер не смог обработать ваш запрос</p>
            </OuterContainer>
        );
    }

    return (
        <div className="container">
            <div className="row">
                {products.map((product: any) => (
                    <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                        <div className="card h-100">
                            <img src={product.image} className="card-img-top" alt={product.name}/>
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <h6 className="card-price">{product.price}</h6>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary">Добавить</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListPage;