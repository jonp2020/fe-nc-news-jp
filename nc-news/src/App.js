import React, { Component } from 'react'
import './App.css';
import { Router } from '@reach/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Article from './pages/Article';

export default class App extends Component {
	state = {
		loggedInStatus: false,
		username: ''
	}

	logInOutBtn = (event) => {
		event.preventDefault()
		this.setState((prevState) => {
			return prevState.loggedInStatus === false ? { loggedInStatus: true, username: 'NewUser99' } : { loggedInStatus: false, username: '' }
		})
	}

	render() {
		return (
			<div className="App" >
				<div className="login-bar">
					{
						!this.state.loggedInStatus ? <button className='login-btn' onClick={this.logInOutBtn} value='login'>Login</button> :
							<div className="login-bar">
								<button className='logout-btn' onClick={this.logInOutBtn} value='logout'>Logout</button>
								<p className="logged-in-text">Logged in as <strong><em>jessjelly</em></strong></p>
							</div>
					}
				</div>
				<Header />
				<Navbar />
				<div className="central-area">
					<Router primary={false}>
						<Home path="/" />
						<Articles loggedInStatus={this.state.loggedInStatus} username={this.state.username} path="/articles" />
						<Article loggedInStatus={this.state.loggedInStatus} username={this.state.username} path="/articles/:article_id" />
						<Articles loggedInStatus={this.state.loggedInStatus} username={this.state.username} path="/topics/:topic" />
					</Router>
				</div>
				<Footer />


			</div >
		);
	}
}

