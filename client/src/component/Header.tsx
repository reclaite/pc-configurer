import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-warning mb-5 w-100">
            <nav className="navbar navbar-expand-lg navbar-light bg-warning container">
                <Link to="/" className="navbar-brand text-dark fw-bold">PC Configurer</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse${isOpen ? ' show' : ''}`}>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/build" className="nav-link text-dark">Собрать сборку</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/components" className="nav-link text-dark">Компоненты</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link text-dark">О нас</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;