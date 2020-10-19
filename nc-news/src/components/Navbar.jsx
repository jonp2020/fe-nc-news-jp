import React, { Component } from 'react'
import axios from 'axios'
import { Link } from '@reach/router';


export default class Navbar extends Component {
	state = {
		topics: [],
		dropdown: 'hide',
		isLoading: true
	}


	componentDidMount = () => {
		axios
			.get('https://nc-news-fe-jonp.herokuapp.com/api/topics')
			.then(({ data: { topics } }) => {
				console.log('topics', { topics });
				this.setState({
					topics,
					isLoading: false,
				});
			}).then(() => {
				console.log('state', this.state);
			})
	};

	dropDownFunc = (event) => {

	}

	loginBtn = (event) => {

	}



	render() {
		const { topics } = this.state
		return (
			<nav className="nav-bar">
				<p>New</p>
				<p>Popular</p>
				<div className="dropdown">
					<button onClick={this.dropDownFunc} className="dropbtn">Topics</button>
					<div id="myDropdown" className="dropdown-content">
						{topics.map((topic) => {
							return <Link className="topics-navbar-list" to={`/articles/${topic.slug}`}
								key={topic.slug}>{topic.slug}</Link>
						})}
					</div>
				</div>
				<button className='login-btn' onClick={this.loginBtn}>Login</button>
			</nav>
		)
	}
}
