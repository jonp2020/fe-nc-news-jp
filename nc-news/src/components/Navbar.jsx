import React, { Component } from 'react'
import axios from 'axios'
import { Link } from '@reach/router';
import ErrorDisplay from './ErrorDisplay'
import { FaHome } from 'react-icons/fa'

export default class Navbar extends Component {
	state = {
		topics: [],
		slug: '',
		isLoading: true,
		error: false,
		colorOn: 'blue',
		colorOff: 'yellow'
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
				this.setState({
					error: {
						status: err.status,
						message: err.data.msg
					}
				})
			})
	};

	handleChange = (passedValue) => {
		const topicListElements = document.getElementsByClassName('topics-navbar-list-array')
		for (let i = 0; i < topicListElements.length; i++){
			if(topicListElements[i].id === passedValue){
				topicListElements[i].classList.add("topics-navbar-list-selected")
			} else topicListElements[i].classList.remove("topics-navbar-list-selected")
		}
	}

	render() {
		const { error } = this.state
		if (error) return <ErrorDisplay {...error} />

		const { topics } = this.state
		return (
			<nav className="nav-bar">
				<ul className="topics-nav-menu">
					<li  className="topics-navbar-list" value="front_page" title="Front page"><Link className="topics-navbar-list-array" id="front-page" onClick={() => this.handleChange('front-page')}  to={`/articles`} value="front_page"><FaHome /></Link> </li>
					{topics.map((topic) => {
						const topicSlug = topic.slug
						return <li className="topics-navbar-list" key={topic.slug}   onClick={() => this.handleChange(topicSlug)} title={topic.slug}
						><Link id={topic.slug} to={`/topics/${topic.slug}`} className="topics-navbar-list-array" 
						>{topic.slug}</Link></li>
					})}
				</ul>
			</nav>
		)
	}
}
