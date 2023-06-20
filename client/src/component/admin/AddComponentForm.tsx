import React, {ChangeEvent, FormEvent, useState} from 'react';
import {fetchGet, fetchPost} from "../../lib/api";
import {ProductType} from "../../lib/PcApp";

const AddComponentForm = () => {
    const [componentType, setComponentType] = useState('');
    const [name, setName] = useState("")

    const handleComponentTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setComponentType(event.target.value);
    };

    const handleComponentDataChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setName(value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        fetchGet("/parser/" + componentType.toUpperCase() + "?name=" + name).then(r => console.log(r))
        // отправку данных на сервер или выполнить другую логику
        console.log(name);
    };

    const renderForm = () => {
        return (
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Название"
                    onChange={handleComponentDataChange}
                />
            </div>
        )
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={componentType} onChange={handleComponentTypeChange}>
                <option value="">Выберите тип комплектующего</option>
                <option value="cpu">Процессор</option>
                <option value="motherboard">Материнская плата</option>
                <option value="cooler">Охлаждение</option>
                <option value="memory">RAM</option>
                <option value="videocard">GPU</option>
                <option value="powersupply">БП</option>
                <option value="storage">Накопитель</option>
                <option value="case">Корпус</option>
                {/* Другие варианты комплектующих */}
            </select>
            {renderForm()}
            <button type="submit">Добавить</button>
        </form>
    );
};

export default AddComponentForm;