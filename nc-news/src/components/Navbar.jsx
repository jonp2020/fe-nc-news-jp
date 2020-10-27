import React, { Component } from 'react'
import axios from 'axios'
import { Link } from '@reach/router';
import ErrorDisplay from './ErrorDisplay'


export default class Navbar extends Component {
	state = {
		topics: [],
		isLoading: true,
		error: false
	}

	componentDidMount = () => {
		axios
			.get('https://nc-news-fe-jonp.herokuapp.com/api/topics')
			.then(({ data: { topics } }) => {
				this.setState({
					topics,
					isLoading: false,
				});
			}).catch((err) => {
				console.log('topics err', err);
				this.setState({
					error: {
						status: err.status,
						message: err.data.msg
					}
				})
			})
	};

	render() {
		const { error } = this.state
		console.log('render navbar err', error)
		if (error) return <ErrorDisplay {...error} />

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
