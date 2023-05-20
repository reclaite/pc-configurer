import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import OuterContainer from "../layout/OuterContainer";
import {fetchApi} from "../lib/api";
import Pagination from "../layout/Pagination";
import {getUser, ProductInfo, ProductType} from "../lib/PcApp";
import ProductCard from "../layout/ProductCard";

const pageLimit = 50;

const ProductListPage: React.FC = () => {
    const navigate = useNavigate();

    const {category} = useParams();
    const productType: ProductType = ProductType[category as keyof typeof ProductType];
    const [products, setProducts] = useState([]);
    const [maxPages, setMaxPages] = useState(5)
    const [errorCaught, setErrorCaught] = useState(false);

    const user = getUser();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const page = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1;

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(user)
                let response = await fetchApi(`/${category}/filtered`, user);
                const data = await response.data;
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
                                <ProductCard productType={category as string} product={product}/>
                            ))}
                        </div>
                        <div className="pagination justify-content-center">
                            <ul className="pagination">
                                <Pagination currentPage={page} onPageChange={page => {
                                    navigate(`/products/${category}?page=${page}`);
                                }} totalPages={1}/>
                            </ul>
                        </div>
                    </>
                ) : (
                    <h3 className="my-5 mx-auto p-5 text-center">К сожалению, подходящих компонентов к вашей сборке не
                        найдено</h3>
                )}
            </div>
        </OuterContainer>
    );
};

export default ProductListPage;