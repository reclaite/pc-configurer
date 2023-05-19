import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white mt-5 w-100">
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Раздел 1</h5>
                        <ul className="list-unstyled">
                            <li><a href="/">Ссылка 1</a></li>
                            <li><a href="/">Ссылка 2</a></li>
                            <li><a href="/">Ссылка 3</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Раздел 2</h5>
                        <ul className="list-unstyled">
                            <li><a href="/">Ссылка 4</a></li>
                            <li><a href="/">Ссылка 5</a></li>
                            <li><a href="/">Ссылка 6</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Социальные сети</h5>
                        <ul className="list-inline">
                            <li className="list-inline-item"><a href="https://github.com">Github</a></li>
                            <li className="list-inline-item"><a href="https://t.me/reclaite">Telegram</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;