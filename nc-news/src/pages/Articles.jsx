import React, { Component } from 'react'
import { Router } from '@reach/router';
import axios from 'axios'



export default class Articles extends Component {

	componentDidMount = () => {
		axios.get('https://nc-news-fe-jonp.herokuapp.com/api/articles')
	}

	render() {
		return (
			<section className="main-section">
				ARTICLES HERE
			</section>
		)
	}
}
