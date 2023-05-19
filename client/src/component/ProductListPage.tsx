import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import OuterContainer from "../layout/OuterContainer";
import {fetchApi} from "../lib/api";
import Pagination from "../layout/Pagination";

const pageLimit = 50;

interface ProductInfo {
    id: number,
    image: string,
    title: string,
    price: number
}

enum ProductType {
    cpu = "Процессор",
    motherboard = "Материнская плата",
    videocard = "Видеокарта",
    memory = "Оперативная память",
    powersupply = "Блок питания",

}

const ProductListPage: React.FC = () => {
    const navigate = useNavigate();

    const {category} = useParams();
    const productType: ProductType = ProductType[category as keyof typeof ProductType];
    const [products, setProducts] = useState([]);
    const [maxPages, setMaxPages] = useState(5)
    const [errorCaught, setErrorCaught] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const page = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1;

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetchApi(`/products/${category}?page=${page}`);
                const data = await response.json();
                setProducts(data);

                // response = await fetchApi(`/products`)
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
                <h1>Ошибка :(</h1>
                <p>Сервер не смог обработать ваш запрос</p>
            </OuterContainer>
        );
    }

    const showData = products.length > 0;

    return (
        <OuterContainer>
            <div className="container">
                <h1>Выбор компонента <b>{productType}</b></h1>
                <hr className="my-4"></hr>
                {showData ? (
                    <>
                        <div className="d-flex ml-2 gap-2">
                            {products.map((product: ProductInfo) => (
                                <div key={product.id} className="col-xs-1 col-sm-6 col-md-3 col-lg-2 mb-4 mh-120">
                                    <div className="card">
                                        <img
                                            src="https://vimeworld.com/images/fluidicon.png"
                                            className="mx-auto img-thumbnail card-img-top"
                                            alt={product.title}
                                            style={{ width: '150px', height: '150px' }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.title}</h5>
                                            <h6 className="card-price">{product.price} ₽</h6>
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-primary">Добавить</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pagination justify-content-center">
                            <ul className="pagination">
                                <Pagination currentPage={page} onPageChange={page => {
                                    navigate(`/products/${category}?page=${page}`);
                                }} totalPages={10}/>
                            </ul>
                        </div>
                    </>
                ) : (
                    <h3 className="my-5 mx-auto p-5 text-center">К сожалению, подходящих компонентов к вашей сборке не найдено</h3>
                )}
            </div>
        </OuterContainer>
    );
};

export default ProductListPage;