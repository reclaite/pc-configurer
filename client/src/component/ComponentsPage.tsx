import React from "react";

const ComponentsPage: React.FC = () => {
    return (
        <section className="container d-flex justify-content-center gap-2">
            <div className="container">
                <h1>Выбор компонентов</h1>
                <div className="row">
                    <div className="col-md-4">
                        <h2>Процессоры</h2>
                        <ul className="list-group">
                            <li
                                className="list-group-item"
                                // onClick={() => handleComponentSelect("Процессор 1")}
                            >
                                Процессор 1
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h2>Материнские платы</h2>
                        <ul className="list-group">
                            <li
                                className="list-group-item"
                                // onClick={() => handleComponentSelect("Материнская плата 1")}
                            >
                                Материнская плата 1
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h2>Видеокарты</h2>
                        <ul className="list-group">
                            <li
                                className="list-group-item"
                                // onClick={() => handleComponentSelect("Видеокарта 1")}
                            >
                                Видеокарта 1
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ComponentsPage;