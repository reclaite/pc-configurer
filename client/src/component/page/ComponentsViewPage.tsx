import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getUser, ProductType} from "../../lib/PcApp";
import {fetchGet} from "../../lib/api";
import OuterContainer from "../../layout/OuterContainer";
import ProductCard from "../../layout/ProductCard";
import Pagination from "../../layout/Pagination";
import {Product} from "../../lib/Model";

const ComponentsViewPage: React.FC = () => {
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
                let response = await fetchGet(`/${category}?page=${page}`);
                const data = await response.data;
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
                <h1>Ошибка :(</h1>
                <p>Сервер не смог обработать ваш запрос</p>
            </OuterContainer>
        );
    }

    return (
        <OuterContainer>
            <div className="container">
                <h1>Доступные компоненты: <b>{productType}</b></h1>
                <hr className="my-4"></hr>
                <div className="d-flex justify-content-evenly flex-wrap gap-2">
                    {products.map((product: Product) => (
                        <ProductCard productType={category as string} product={product} showSelect={false}/>
                    ))}
                </div>
                <div className="pagination justify-content-center">
                    <ul className="pagination">
                        <Pagination currentPage={page} onPageChange={page => {
                            navigate(`/products/${category}?page=${page}`);
                        }} totalPages={1}/>
                    </ul>
                </div>
            </div>
        </OuterContainer>
    );
};

export default ComponentsViewPage;