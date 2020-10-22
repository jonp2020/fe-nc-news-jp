import React, { Component } from 'react'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'
import Navbar from '../components/Navbar'

export default class Articles extends Component {
	state = {
		articles: [],
		articlesToDisplay: '',
		isLoading: true
	}

	componentDidMount = () => {
		// console.log('props in articles mount', this.props);
		const { topic } = this.props
		console.log('here in articles did mount');
		// console.log('topic', topic);
		axios.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/`, {
			params: { topic }
		})
			.then((res) => {
				console.log('mount res', res);
				this.setState({ articles: res.data.articles, isLoading: false });
			})
	}

	updateArticlesOnDisplay = (value) => {
		const display = value
		this.setState({ articlesToDisplay: display })
	}

	componentDidUpdate = (prevProps, prevState) => {
		const { topic } = this.props
		const { articlesToDisplay } = this.state
		if (prevState.articlesToDisplay !== this.state.articlesToDisplay || prevProps.topic !== this.props.topic) {
			console.log('in if statement');
			axios
				// .get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/${this.state.articlesToDisplay}`, {
				// 	params: { topic }
				// })
				.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/`, {
					params: { topic, articlesToDisplay }
				})
				.then((res) => {
					console.log('res', res);
					this.setState({ articles: res.data.articles })
				})
		}
	}

	render() {

		if (this.state.isLoading) return <p>Fetching articles</p>
		console.log('articles props', this.props);
		return (
			<div>
				{/* <Navbar updateArticlesOnDisplay={this.updateArticlesOnDisplay} updateTopics={this.updateTopics} /> */}
				<section className="main-section">
					{this.state.articles.map((article) => {
						return <ArticleCard key={article.article_id} article={article} />
					})}
				</section>
			</div>
		)
	}
}
