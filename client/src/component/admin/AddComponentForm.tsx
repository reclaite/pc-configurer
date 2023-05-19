import React, {ChangeEvent, FormEvent, useState} from 'react';
import {fetchPost} from "../../lib/api";

const AddComponentForm = () => {
    const [componentType, setComponentType] = useState('');
    const [componentData, setComponentData] = useState({});

    const handleComponentTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setComponentType(event.target.value);
    };

    const handleComponentDataChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setComponentData((prevData) => ({...prevData, [name]: value}));
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        fetchPost("/" + componentType, componentData).then(r => console.log(r.text()))
        // отправку данных на сервер или выполнить другую логику
        console.log(componentData);
    };

    const renderForm = () => {
        switch (componentType) {
            case 'cpu':
                return (
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Название процессора"
                            onChange={handleComponentDataChange}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Цена"
                            onChange={handleComponentDataChange}
                        />
                        {/* Дополнительные поля для процессора */}
                    </div>
                );
            case 'motherboard':
                return (
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Название материнской платы"
                            onChange={handleComponentDataChange}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Цена"
                            onChange={handleComponentDataChange}
                        />
                        {/* Дополнительные поля для материнской платы */}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={componentType} onChange={handleComponentTypeChange}>
                <option value="">Выберите тип комплектующего</option>
                <option value="cpu">Процессор</option>
                <option value="motherboard">Материнская плата</option>
                {/* Другие варианты комплектующих */}
            </select>
            {renderForm()}
            <button type="submit">Добавить</button>
        </form>
    );
};

export default AddComponentForm;