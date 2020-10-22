import React, { Component } from 'react'
import axios from 'axios'
import { Link } from '@reach/router';


export default class Navbar extends Component {
	state = {
		topics: [],
		// dropdown: 'hide',
		isLoading: true,
		query: '',
		loggedInStatus: false
	}

	componentDidMount = () => {
		axios
			.get('https://nc-news-fe-jonp.herokuapp.com/api/topics')
			.then(({ data: { topics } }) => {
				this.setState({
					topics,
					isLoading: false,
				});
			}).then(() => {
			})
	};

	logInOutBtn = (event) => {
		event.preventDefault()
		this.setState((prevState) => {
			return { loggedInStatus: !prevState.loggedInStatus }
		})
	}

	// updateQueryState = (newQuery) => {
	// 	newQuery.preventDefault()
	// 	console.log('newQuery', newQuery);
	// 	this.setState({ query: newQuery })
	// 	console.log('navbar', this.state);
	// }

	render() {
		const { topics } = this.state
		return (
			<nav className="nav-bar">
				<ul className="topics-nav-menu">
					<li className="topics-navbar-list"><Link className="topics-navbar-list" to={`/articles`}>Front Page</Link> </li>
					{topics.map((topic) => {
						return <li className="topics-navbar-list" key={topic.slug}><Link to={`/topics/${topic.slug}`} className="topics-navbar-list"
						>{topic.slug}</Link></li>
					})}
				</ul>
				{
					!this.state.loggedInStatus ? <button className='login-btn' onClick={this.logInOutBtn} value='login'>Login</button> :
						<div>
							<p>Logged in as NewUser</p>
							<button className='logout-btn' onClick={this.logInOutBtn} value='logout'>Logout</button>
						</div>
				}



			</nav>
		)
	}
}
