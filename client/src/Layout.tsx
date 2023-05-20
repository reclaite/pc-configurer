import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './component/Header';
import AboutPage from './component/AboutPage';
import Home from "./component/Home";
import Footer from "./component/Footer";
import Wrapper from "./component/Wrapper";
import NotFound from "./component/NotFoundPage";
import AdminPage from "./component/admin/AdminPage";
import ProductListPage from "./component/ProductListPage";
import ComponentsPage from "./component/ComponentsPage";
import ComponentsViewPage from "./component/ComponentsViewPage";

const Layout: React.FC = () => {
    return (
        <Router>
            <Header/>
            <Wrapper>
                <Routes>
                    <Route path="/" Component={Home}/>
                    <Route path="/about" Component={AboutPage}/>
                    <Route path="/admin" Component={AdminPage}/>
                    <Route path="/products/:category" Component={ProductListPage}/>
                    <Route path="/components" Component={ComponentsPage}/>
                    <Route path="/components/:category" Component={ComponentsViewPage}/>
                    <Route path="*" Component={NotFound}/>
                </Routes>
            </Wrapper>
            <Footer/>
        </Router>
    );
};

export default Layout;