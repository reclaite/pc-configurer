import React from 'react';
import OuterContainer from "../layout/OuterContainer";
import {useNavigate} from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    const buildClick = () => {
        navigate("/build");
    }

    return (
        <OuterContainer>
            <h1 className="container title col-md-10 col-sm-10 text-center">Добро пожаловать в конфигуратор персональных компьютеров</h1>
            <hr className="my-4"></hr>
            <div className="flex-wrap d-flex justify-content-center align-items-center">
                <div className="container text text-center col-md-5 px-0 mb-2">
                    <p className="">
                        Здесь вы сможете собрать собственную сборку компьютера для необходимых вам задач и поделиться ей с
                        другими.
                        Поддерживаются офисные, игровые, графические комплектующие, охватывающие весь основной спектр
                        задач, выполняемых на персональном компьютере.
                    </p>
                    <button className="btn btn-primary" onClick={buildClick}>Начать сборку</button>
                </div>
                <div className="col-md-5 px-0">
                    <img src="/computer.jpg" alt="Компьютер" className="mx-auto rounded img-fluid mb-2"></img>
                </div>
            </div>
        </OuterContainer>
    );
};

export default Home;