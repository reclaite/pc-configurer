import React, {useEffect, useState} from "react";
import OuterContainer from "../../layout/OuterContainer";
import {CompleteBuild} from "./BuildPage";
import {useParams} from "react-router-dom";
import {fetchGet} from "../../lib/api";

interface BuildProps {
    build: CompleteBuild
}

const ShowBuildPage: React.FC = () => {
    const {id} = useParams();
    const [build, setBuild] = useState<CompleteBuild>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchGet(`/build/${id}`);
                setBuild(response.data);
            } catch (error) {

            }
        }

        fetchData();
    });

    return (
        <OuterContainer>
            <h1>{build?.title}</h1>
            <p>Итоговая стоимость: <b>52843 ₽</b></p>
            <hr className="my-4"></hr>
            <div key="1" className="w-100 d-flex flex-wrap justify-content-center gap-2 col-lg-1 mb-4">
                <div className="card w-25">
                    <img
                        src="https://c.dns-shop.ru/thumb/st4/fit/500/500/df58c03353a8c60548aab24cb45947ca/07ec46b8cb16c5dfa55000b168a4d57d4a6fc2c3259fb125bd4f4ee724a51eae.jpg.webp"
                        className="mx-auto img-thumbnail card-img-top"
                        style={{width: '150px', height: '150px'}}
                    />
                    <div className="card-body">
                        <h5 className="card-title">Intel Core i5-12400F</h5>
                        <h6 className="card-price">15499 ₽</h6>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Подробнее</button>
                    </div>
                </div>
                <div className="card w-25">
                    <img
                        src="https://c.dns-shop.ru/thumb/st1/fit/500/500/a15306e4398ad12621d2fbf9f0879db5/e422e69f2d6e60b36efab268e02087030dc8469baf23ff3382d2f119879ba7c2.jpg.webp"
                        className="mx-auto img-thumbnail card-img-top"
                        style={{width: '150px', height: '150px'}}
                    />
                    <div className="card-body">
                        <h5 className="card-title">GIGABYTE B660M DS3H DDR4</h5>
                        <h6 className="card-price">8899 ₽</h6>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Подробнее</button>
                    </div>
                </div>
                <div className="card w-25">
                    <img
                        src="https://c.dns-shop.ru/thumb/st4/fit/500/500/e30479e9e7ffd2ec99c01e6cdb6e14ba/6c74b1d0f6c651c07391a7070a4313da9e9ce188244cea9e4497ff029e9fbcc3.jpg.webp"
                        className="mx-auto img-thumbnail card-img-top"
                        style={{width: '150px', height: '150px'}}
                    />
                    <div className="card-body">
                        <h5 className="card-title">ExeGate BAA-113U [EX292351RUS]</h5>
                        <h6 className="card-price">1799 ₽</h6>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Подробнее</button>
                    </div>
                </div>
                <div className="card w-25">
                    <img
                        src="https://c.dns-shop.ru/thumb/st4/fit/500/500/2c656f7cc12484e9121361411773381e/d00ac9cc322bb23897ef78c4b923785ba289c1fb0898e9cf28b83030e9605620.jpg.webp"
                        className="mx-auto img-thumbnail card-img-top"
                        style={{width: '150px', height: '150px'}}
                    />
                    <div className="card-body">
                        <h5 className="card-title">MSI AMD Radeon RX 550 AERO ITX</h5>
                        <h6 className="card-price">8499 ₽</h6>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Подробнее</button>
                    </div>
                </div>
                <div className="card w-25">
                    <img
                        src="https://c.dns-shop.ru/thumb/st4/fit/500/500/d2f2abf0a2f70faf76cc9a62a4229a5b/ffbded224aae37a1de73f7286cbda0b108b047c6024115b00e33737efe51e1ea.jpg.webp"
                        className="mx-auto img-thumbnail card-img-top"
                        style={{width: '150px', height: '150px'}}
                    />
                    <div className="card-body">
                        <h5 className="card-title">DEEPCOOL AG300 LED</h5>
                        <h6 className="card-price">1699 ₽</h6>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Подробнее</button>
                    </div>
                </div>
                <div className="card w-25">
                    <img
                        src="https://c.dns-shop.ru/thumb/st1/fit/500/500/0e5daa2feda3d045c684f90693befd41/6534fc1b3689bd4924ce49690057d12690cdeedfb0d67fd6ea8d65b642333b6d.jpg.webp"
                        className="mx-auto img-thumbnail card-img-top"
                        style={{width: '150px', height: '150px'}}
                    />
                    <div className="card-body">
                        <h5 className="card-title">Patriot Viper Elite II [PVE244G266C6] 16ГБ</h5>
                        <h6 className="card-price">7699 ₽</h6>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Подробнее</button>
                    </div>
                </div>
                <div className="card w-25">
                    <img
                        src="https://c.dns-shop.ru/thumb/st4/fit/500/500/8e04ad496933bc420bfa78a427ca6df7/b53255cf02a3888250c43476551d8702e9d626dbc96e3884aa355f7fc07ccfbf.jpg.webp"
                        className="mx-auto img-thumbnail card-img-top"
                        style={{width: '150px', height: '150px'}}
                    />
                    <div className="card-body">
                        <h5 className="card-title">SATA накопитель Samsung 870 EVO [MZ-77E500BW]</h5>
                        <h6 className="card-price">5799 ₽</h6>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Подробнее</button>
                    </div>
                </div>
                <div className="card w-25">
                    <img
                        src="https://c.dns-shop.ru/thumb/st1/fit/500/500/dddcee3ee95ad4e130dcaa9522db2af3/b5ac31867a4d4b6f5f3ac0b9b9e6f20d53b1e791fa5de34ee22b4003b27c6d86.jpg.webp"
                        className="mx-auto img-thumbnail card-img-top"
                        style={{width: '150px', height: '150px'}}
                    />
                    <div className="card-body">
                        <h5 className="card-title">DEEPCOOL DQ750 [DQ750-M-V2L]</h5>
                        <h6 className="card-price">9599 ₽</h6>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Подробнее</button>
                    </div>
                </div>
            </div>
        </OuterContainer>
    );
}

export default ShowBuildPage;