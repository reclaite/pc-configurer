import React from "react";
import {UserInfo} from "../lib/PcApp";
import {useNavigate} from "react-router-dom";

interface SelectedCardProps {
    user: UserInfo,
    title: string,
    type: string
}

const SelectedCard: React.FC<SelectedCardProps> = ({user, title, type}) => {
    const navigate = useNavigate();
    const product = user.selected[type];

    const hasProduct = product != null;

    const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
        navigate(`/select/${type}`)
    };

    return (
        <div className="w-75 mx-auto card card-body my-1">
            <p className="text-center fw-bold">{title}</p>
            <hr className="my-1"></hr>
            {
                hasProduct ? (
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
                                <td><img src="/question.png" alt={title} className="img-thumbnail col-2 col-md-3 col-sm-5"></img></td>
                                <td className="fw-bold col-md-4 col-sm-5">{product.title}</td>
                                <td className="col-md-4 col-sm-2">{product.price} ₽</td>
                            </tr>
                            </tbody>
                        </table>
                        <p onClick={handleClick} role="button"
                           className="text-center border-primary border rounded mx-auto col-md-4 col-sm-4">Нажмите,
                            чтобы заменить</p>
                    </>
                ) : (
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
                                <td><img src="/question.png" alt={title} className="img-thumbnail col-md-4 col-sm-5"></img></td>
                                <td className="fw-bold col-md-4 col-sm-3">Не выбрано</td>
                                <td className="col-md-4 col-sm-2">-</td>
                            </tr>
                            </tbody>
                        </table>
                        <p onClick={handleClick} role="button"
                           className="text-center border-dark border rounded mx-auto col-md-4 col-sm-4">Нажмите,
                            чтобы выбрать</p>
                    </>
                )
            }
        </div>
    );
}

export default SelectedCard;