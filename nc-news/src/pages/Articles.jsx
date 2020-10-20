import React, { Component } from 'react'
import { Router } from '@reach/router';
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'



export default class Articles extends Component {
	state = {
		articles: [],
		isLoading: true
	}

	componentDidMount = () => {
		axios.get('https://nc-news-fe-jonp.herokuapp.com/api/articles')
			.then((res) => {
				this.setState({ articles: res.data.articles, isLoading: false });
			}).then(() => {
				// console.log('article state ', this.state);
			})
	}

	render() {
		if (this.state.isLoading) return <p>Fetching articles</p>
		return (
			<section className="main-section">
				{this.state.articles.map((article) => {
					return <ArticleCard key={article.article_id} article={article} />
				})}
			</section>
		)
	}
}
