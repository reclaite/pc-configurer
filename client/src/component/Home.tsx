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
            <div className="mw-50">
                <h1 className="container title">Добро пожаловать в конфигуратор персональных компьютеров</h1>
                <hr className="my-4"></hr>
                <p className="container text">Здесь вы сможете собрать собственную сборку компьютера и поделиться ей с
                    другими</p>
                <button className="btn btn-primary" onClick={buildClick}>Начать сборку</button>
            </div>
        </OuterContainer>
    );
};

export default Home;