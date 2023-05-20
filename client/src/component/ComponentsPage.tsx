import React from "react";
import OuterContainer from "../layout/OuterContainer";
import TypeCard from "../layout/TypeCard";

const ComponentsPage: React.FC = () => {
    return (
        <OuterContainer>
            <h1 className="fw-bold">Выберите тип компонента</h1>
            <hr className="my-4"></hr>
            <div className="d-flex flex-wrap justify-content-center gap-2 mw-100">
                <TypeCard componentType={"Процессоры"} linkTo="/components/cpu"/>
                <TypeCard componentType={"Материнские платы"} linkTo="/components/motherboard"/>
                <TypeCard componentType={"Охлаждение процессора"} linkTo="/components/cooler"/>
                <TypeCard componentType={"Оперативная память"} linkTo="/components/memory"/>
                <TypeCard componentType={"Видеокарты"} linkTo="/components/videocard"/>
                <TypeCard componentType={"Блоки питания"} linkTo="/components/powersupply"/>
                <TypeCard componentType={"Накопители"} linkTo="/components/storage"/>
                <TypeCard componentType={"Корпусы"} linkTo="/components/case"/>
            </div>
        </OuterContainer>
    );
}

export default ComponentsPage;