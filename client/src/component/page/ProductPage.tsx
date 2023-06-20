import React, {useEffect, useState} from 'react';
import {fetchGet, getImages} from "../../lib/api";
import OuterContainer from "../../layout/OuterContainer";
import {useParams} from "react-router-dom";
import {Product} from "../../lib/Model";

const ProductPage = () => {
    const params = useParams();
    const category = params.category;
    const id = params.id;

    const [activeIndex, setActiveIndex] = useState(0);
    const [product, setProduct] = useState<Product>();
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetchGet(`/${category}/${id}`);
                const data = await response.data;
                setProduct(data);
            } catch (error) {
                console.error('Ошибка при получении товара:', error);
            }
        };

        fetchData();
    }, [category]);

    useEffect(() => {
        if (product == null) {
            return;
        }

        getImages(product)
            .then((resultImages) => {
                if (resultImages.length === 0) {
                    setImages(["https://vimeworld.com/images/fluidicon.png", "https://otkritkit.ru/wp-content/uploads/krasivye-kartinki-s-bukvami-z-i-v-4.jpg"]);
                    return;
                }
                setImages(resultImages);
            })
            .catch((error) => {
                console.error('Ошибка получения картинок:', error);
            });
    }, [product]);

    const handleSelect = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, selectedIndex: number) => {
        setActiveIndex(selectedIndex);
        event.preventDefault();
    };

    console.log(images);

    return (
        <OuterContainer>
            <h1>Информация о комплектующем</h1>
            <hr className="my-4"></hr>
            {product != null ?
                <>
                    <div className="row mx-auto">
                        <div className="col-10 col-md-6 mx-auto mb-4">
                            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                <ol className="carousel-indicators">
                                    {images.map((_, index) => (
                                        <li
                                            key={index}
                                            data-bs-target="#carouselExampleIndicators"
                                            data-bs-slide-to={index}
                                            className={index === activeIndex ? 'active' : ''}
                                        ></li>
                                    ))}
                                </ol>
                                <div className="carousel-inner">
                                    {images.map((image, index) => (
                                        <div key={index}
                                             className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                                            <img className="d-block w-100" src={image}
                                                 alt={`${product?.title} ${index}`}/>
                                        </div>
                                    ))}
                                </div>
                                <a
                                    className="carousel-control-prev"
                                    href="#carouselExampleIndicators"
                                    role="button"
                                    data-bs-slide="prev"
                                    onClick={(event) => handleSelect(event, (activeIndex - 1 + images.length) % images.length)}
                                >
                                    <span className="carousel-control-prev-icon bg-black rounded p-2" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </a>
                                <a
                                    className="carousel-control-next"
                                    href="#carouselExampleIndicators"
                                    role="button"
                                    data-bs-slide="next"
                                    onClick={(event) => handleSelect(event, (activeIndex + 1) % images.length)}
                                >
                                    <span className="carousel-control-next-icon bg-black rounded p-2" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <h2>{product.title}</h2>
                            <h5>Цена: {product.price} ₽ (MVideo)</h5>
                            <hr className="my-4"></hr>
                            {Object.entries(product.otherSpecifications).map(([key, value]) => (
                                <p className="mb-0" key={key}>
                                    <strong>{key}: </strong>
                                    {value}
                                </p>
                            ))}
                        </div>
                    </div>
                </>
                :
                <>
                    {/*TODO: not loaded?*/}
                </>
            }
        </OuterContainer>
    );
};

export default ProductPage;