import React, { Component } from 'react'
import axios from 'axios'
import { Link } from '@reach/router';


export default class Navbar extends Component {
	state = {
		topics: [],
		isLoading: true,
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

			</nav>
		)
	}
}
