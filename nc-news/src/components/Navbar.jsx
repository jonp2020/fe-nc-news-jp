import React, { Component } from 'react'
import axios from 'axios'
import { Link } from '@reach/router';


export default class Navbar extends Component {
	state = {
		topics: [],
		// dropdown: 'hide',
		isLoading: true,
		query: ''
	}

	componentDidMount = () => {
		// console.log('mount', this.props);
		axios
			.get('https://nc-news-fe-jonp.herokuapp.com/api/topics')
			.then(({ data: { topics } }) => {
				this.setState({
					topics,
					isLoading: false,
				});
			}).then(() => {
				// console.log('state', this.state);
			})
	};

	// dropDownFunc = (event) => {
	// 	event.preventDefault()
	// 	if (this.state.dropdown === 'hide') this.setState({ dropdown: '' })
	// 	if (this.state.dropdown === '') this.setState({ dropdown: 'hide' })
	// }

	// linkToArticles = (event) => {
	// 	const value = event.target.value
	// 	this.props.updateArticlesOnDisplay(value)
	// }

	// linkToTopics = (event) => {
	// 	const value = event.target.value
	// 	this.props.updateTopics(value)
	// }

	updateQueryState = (newQuery) => {
		newQuery.preventDefault()
		console.log('newQuery', newQuery);
		this.setState({ query: newQuery })
		console.log('navbar', this.state);
	}

	render() {
		const { topics } = this.state
		return (
			<nav className="nav-bar">
				{/* <Link to={`/articles/${this.state.query}`}><button onClick={() => this.updateQueryState('?order')}>Latest news</button></Link>
				{/* <button onClick={this.linkToArticles} value="?order">Latest news</button> */}
				{/* <Link to={`/articles/${this.state.query}`}>
					<button onClick={() => this.updateQueryState('?sort_by=comment_count')}>Most commented</button>
				</Link> */}
				{/* <p onClick={this.dropDownFunc} className="dropbtn dropdown-content">Topics</p> */}

				<ul className="topics-nav-menu">
					<li className="topics-navbar-list"><Link className="topics-navbar-list" to={`/articles`}>Front Page</Link> </li>
					{topics.map((topic) => {
						return <li className="topics-navbar-list" key={topic.slug}><Link to={`/topics/${topic.slug}`} className="topics-navbar-list"
						>{topic.slug}</Link></li>
					})}
				</ul>

				<button className='login-btn' onClick={this.loginBtn}>Login</button>
			</nav >
		)
	}
}
