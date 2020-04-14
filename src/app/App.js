import React from 'react';
import './App.css';
import background from "../assets/images/bg.webp";
import './fontawesome';
import Header from "./components/header/header";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AboutPage from "./pages/about/about";
import HomePage from "./pages/home/home";
import PostPage from "./pages/post/post";
import Footer from "./components/footer/footer";
import InvalidPage from "./pages/invalid/invalid";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top";

export default function App() {
    return (
        <div className="app">
            <img className="bg-image" src={background} alt="Sparrows flying out of tree"/>
            <Router>
                <Header/>
                <Switch>
                    <Route path="/" component={HomePage} exact />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/404" component={InvalidPage} />
                    <ScrollToTop>
                        <Route path="/:slug" component={PostPage}/>
                    </ScrollToTop>
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}
