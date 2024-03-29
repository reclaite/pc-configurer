import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './component/Header';
import AboutPage from './component/page/AboutPage';
import Home from "./component/Home";
import Footer from "./component/Footer";
import Wrapper from "./component/Wrapper";
import NotFound from "./component/page/NotFoundPage";
import AdminPage from "./component/admin/AdminPage";
import ComponentSelectPage from "./component/page/ComponentSelectPage";
import ComponentsPage from "./component/page/ComponentsPage";
import ComponentsViewPage from "./component/page/ComponentsViewPage";
import BuildPage from "./component/page/BuildPage";
import ShowBuildPage from "./component/page/ShowBuildPage";
import ProductPage from "./component/page/ProductPage";

const Layout: React.FC = () => {
    return (
        <Router>
            <Header/>
            <Wrapper>
                <Routes>
                    <Route path="/" Component={Home}/>
                    <Route path="/admin" Component={AdminPage}/>
                    <Route path="/about" Component={AboutPage}/>
                    <Route path="/build" Component={BuildPage}/>
                    <Route path="/config/:id" Component={ShowBuildPage}/>
                    <Route path="/view/:category/:id" Component={ProductPage}/>
                    <Route path="/select/:category" Component={ComponentSelectPage}/>
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
