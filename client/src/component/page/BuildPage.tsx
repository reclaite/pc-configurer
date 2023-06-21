import React, {useEffect, useRef, useState} from "react";
import OuterContainer from "../../layout/OuterContainer";
import {clearUser, ConfigurationType, getUser, ProductType} from "../../lib/PcApp";
import PurposeCard from "../../layout/PurposeCard";
import {fetchGet, fetchPost} from "../../lib/api";
import SelectedCard from "../../layout/SelectedCard";
import {Product} from "../../lib/Model";
import {useNavigate} from "react-router-dom";

export interface CompleteBuild {
    id: string,
    title: string,
    configurationType: ConfigurationType,
    products: Map<ProductType, number>
}

function id(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

const BuildPage: React.FC = () => {
    const [user, setUser] = useState(getUser());
    const [title, setTitle] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [configurationTypes, setConfigurationTypes] = useState([]);

    const navigate = useNavigate();

    const [saveConfig, setSaveConfig] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("-");

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
                <div className="mt-4 col-6 col-sm-4 col-md-3 col-xl-2 mx-auto text-center">
                    <button className="btn btn-primary">Подберу самостоятельно</button>
                </div>
            </OuterContainer>
        )
    }

    let overallPrice = 0;
    for (let selectedKey in user.selected) {
        overallPrice += user.selected[selectedKey].price
    }

    const copyText = () => {
        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand("copy");
        }
    };

    const clear: React.MouseEventHandler<HTMLButtonElement> = () => {
        clearUser();
        setUser(user);
        window.location.reload();
    };

    const showSaveInfo = () => {
        setSaveConfig(true);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Предотвращает обновление страницы при отправке формы

        const productIds: Map<ProductType, number> = new Map<ProductType, number>();

        for (let key in user.selected) {
            if (user.selected.hasOwnProperty(key)) {
                const productType: ProductType = key as ProductType;
                const product: Product = user.selected[key];
                productIds.set(productType, product.id);
            }
        }

        let urlId = id(12);

        const completeBuild: CompleteBuild = {
            id: urlId,
            title: title,
            configurationType: user.configurationType,
            products: productIds,
        };

        try {
            const response = await fetchPost('/build/save', completeBuild);
            setUrl(urlId);
            navigate("/config/" + urlId);
            console.log(response.data); // Обработка успешного ответа сервера
        } catch (error) {
            console.error(error); // Обработка ошибок
        }
    };

    return (
        <OuterContainer>
            <div className="d-flex justify-content-between">
                <h1 className="fw-bold">Выберите тип компонента</h1>
                <button className="btn btn-danger" onClick={clear}>Очистить выбор</button>
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
                    <p className="text-center">Общая стоимость комплектующих <b>{overallPrice} ₽</b></p>
                    {!saveConfig ?
                        <>
                            <button onClick={showSaveInfo} className="btn btn-primary col-md-3 mx-auto">Сохранить
                                конфигурацию
                            </button>
                        </> :
                        <>
                            <div className="card container mx-auto p-4 col-7">
                                <h3>Сохранение конфигурации</h3>
                                <hr className="my-4"></hr>
                                <div className="mb-3 card-text">
                                    <label htmlFor="title" className="form-label">Название конфигурации</label>
                                    <input type="text" className="form-control" id="title" value={title}
                                           onChange={e => setTitle(e.target.value)} required/>
                                </div>
                                <div className="w-50 mx-auto text-center">
                                    <button onClick={handleSubmit} type="submit"
                                            className="btn btn-primary mb-3">Сохранить
                                    </button>
                                </div>
                            </div>
                        </>
                    }
                    {
                        url !== "-" ?
                            <>
                                <div className="card card-body mt-4 w-50 mx-auto">
                                    <p><b>Конфигурация успешно сохранена!</b> Вы можете поделиться ей с другими по
                                        данной ссылке:
                                    </p>
                                    <hr className="my-1"></hr>
                                    <div className="input-group mt-3">
                                        <input type="text" className="form-control" id="myInput" ref={inputRef}
                                               value={`https://pcconfigurer.ru/config/${url}`}
                                               readOnly/>
                                        <button className="btn btn-primary" type="button"
                                                onClick={copyText}>Копировать
                                        </button>
                                    </div>
                                </div>
                            </> :
                            <></>
                    }
                </div>
            </div>
        </OuterContainer>
    );
}

export default BuildPage;