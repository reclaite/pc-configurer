import React, {useEffect, useState} from "react";
import OuterContainer from "../../layout/OuterContainer";
import {ConfigurationType, getUser} from "../../lib/PcApp";
import PurposeCard from "../../layout/PurposeCard";
import {fetchGet} from "../../lib/api";
import SelectedCard from "../../layout/SelectedCard";

const BuildPage: React.FC = () => {
    const user = getUser();
    const [configurationTypes, setConfigurationTypes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchGet("/api/products/types");
                setConfigurationTypes(response.data);
            } catch (error) {

            }
        }

        fetchData();
    }, []);

    if (user.configurationType == null) {
        return (
            <OuterContainer>
                <h1 className="fw-bold">Для каких целей планируете собирать ПК?</h1>
                <hr className="my-4"></hr>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                    {configurationTypes.map((type: ConfigurationType) => (
                        <PurposeCard user={user} configurationType={type}/>
                    ))}
                </div>
            </OuterContainer>
        )
    }

    let overallPrice = 0;
    for (let selectedKey in user.selected) {
        overallPrice += user.selected[selectedKey].price
    }

    const copyText: React.MouseEventHandler<HTMLButtonElement> = () => {
        // const inputRef = useRef<HTMLInputElement>(null);
        //
        // if (inputRef.current) {
        //     inputRef.current.select();
        //     document.execCommand('copy');
        // }
    }

    return (
        <OuterContainer>
            <div className="d-flex justify-content-between">
                <h1 className="fw-bold">Выберите тип компонента</h1>
                <button className="btn btn-danger">Очистить выбор</button>
            </div>
            <hr className="my-4"></hr>
            <div className="d-flex flex-wrap justify-content-center gap-2">
                <SelectedCard user={user} title={"Процессор"} type={"cpu"}/>
                <SelectedCard user={user} title={"Материнская плата"} type={"motherboard"}/>
                <SelectedCard user={user} title={"Охлаждение процессора"} type={"cooler"}/>
                <SelectedCard user={user} title={"Оперативная память"} type={"memory"}/>
                <SelectedCard user={user} title={"Видеокарта"} type={"videocard"}/>
                <SelectedCard user={user} title={"Блок питания"} type={"powersupply"}/>
                <SelectedCard user={user} title={"Накопитель"} type={"storage"}/>
                <SelectedCard user={user} title={"Корпус"} type={"case"}/>
                <hr className="my-4"></hr>
                <div className="card card-body my-2">
                    <p className="text-center">Общая стоимость комплектующих <b>{overallPrice}₽</b></p>
                    <button className="btn btn-primary col-md-3 mx-auto">Сохранить конфигурацию</button>
                    <div className="card card-body mt-4 w-50 mx-auto">
                        <p><b>Конфигурация успешно сохранена!</b> Вы можете поделиться ей с другими по данной ссылке:</p>
                        <hr className="my-1"></hr>
                        <div className="input-group mt-3">
                            <input type="text" className="form-control" id="myInput" value="https://pcconfigurer.ru/config/8f56c9b214a9d6f78296e2daf6614fb5" readOnly />
                            <button className="btn btn-primary" type="button" onClick={copyText}>Копировать</button>
                        </div>
                    </div>
                </div>
            </div>
        </OuterContainer>
    );
}

export default BuildPage;