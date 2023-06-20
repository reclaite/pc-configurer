import React, {useEffect, useState} from "react";
import {saveUser, UserInfo} from "../lib/PcApp";
import {useNavigate} from "react-router-dom";
import {getImages} from "../lib/api";

interface SelectedCardProps {
    user: UserInfo,
    title: string,
    type: string
}

const SelectedCard: React.FC<SelectedCardProps> = ({user, title, type}) => {
    const [images, setImages] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState(user);
    const navigate = useNavigate();
    const product = user.selected[type];

    const hasProduct = product != null;

    const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
        navigate(`/select/${type}`)
    };

    const remove: React.MouseEventHandler<HTMLDivElement> = () => {
        delete user.selected[type];
        saveUser(user);
        setSelectedUser(user);
        window.location.reload();
    }

    useEffect(() => {
        if (hasProduct) {
            getImages(product)
                .then((resultImages) => {
                    setImages(resultImages);
                })
                .catch((error) => {
                    console.error('Ошибка:', error);
                });
        }
    }, [hasProduct, product]);

    const image = images.length > 0 ? images[0] : "/question.png";

    return (
        <div className="w-75 mx-auto card card-body my-1">
            <p className="text-center fw-bold mb-1">{title}</p>
            <hr className="mb-1 mt-0"></hr>
            <>
                <table className="table align-middle">
                    <thead>
                    <tr>
                        <th scope="col">Картинка</th>
                        <th scope="col">Название</th>
                        <th scope="col">Цена</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><img src={image} alt={title} className="img-thumbnail col-8 col-lg-5"></img></td>
                        <td className="fw-bold col-7">
                            {hasProduct ?
                                <a href={`view/${type}/${product.id}`} className="text-decoration-none">{product.title}</a>
                            : "Не выбрано"}
                        </td>
                        <td className="col-3">{hasProduct ? product.price + "₽" : "-"}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="mx-auto d-flex flex-wrap gap-2 align-items-center">
                    <p onClick={handleClick} role="button"
                       className="text-center btn btn-success mx-auto mb-0 px-3">{hasProduct ? "Заменить" : "Выбрать"}</p>
                    {hasProduct ? (
                        <p onClick={remove} role="button"
                           className="text-center btn btn-warning mx-auto mb-0 px-3">Удалить</p>
                    ) : (<></>)}
                </div>
            </>
        </div>
    );
}

export default SelectedCard;