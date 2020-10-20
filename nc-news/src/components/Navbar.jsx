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
				this.setState({
					topics,
					isLoading: false,
				});
			}).then(() => {
				console.log('state', this.state);
			})
	};

	dropDownFunc = (event) => {
		event.preventDefault()
		if (this.state.dropdown === 'hide') this.setState({ dropdown: '' })
		if (this.state.dropdown === '') this.setState({ dropdown: 'hide' })
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
					<p onClick={this.dropDownFunc} className="dropbtn dropdown-content">Topics</p>

					<ul className={this.state.dropdown}>
						{topics.map((topic) => {
							return <li className="topics-navbar-list" key={topic.slug}><Link to={`/articles/${topic.slug}`} className="topics-navbar-list"
							>{topic.slug}</Link></li>
						})}
					</ul>
				</div>
				<button className='login-btn' onClick={this.loginBtn}>Login</button>
			</nav>
		)
	}
}
