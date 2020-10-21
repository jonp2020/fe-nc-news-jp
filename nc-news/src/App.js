import React, { Component } from 'react'
import './App.css';
import { Router } from '@reach/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
// import Navbar from './components/Navbar';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Article from './pages/Article';


export default class App extends Component {
	render() {
		return (
			<div className="App" >
				<Header />
				{/* <Navbar /> */}
				<div className="central-area">
					<Router>
						<Home path="/" />
						<Articles path="/articles" />
						<Articles path="/articles/:topic" />
						<Article path="/articles/:article_id" />
					</Router>
				</div>
				<Footer />


			</div>
		);
	}
}

