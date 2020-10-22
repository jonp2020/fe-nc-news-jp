import React, { Component } from 'react'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'
// import Navbar from '../components/Navbar'

export default class Articles extends Component {
	state = {
		articles: [],
		articlesToDisplay: '',
		isLoading: true
	}

	componentDidMount = () => {
		const { topic } = this.props
		axios.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/`, {
			params: { topic }
		})
			.then((res) => {
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
		console.log('articles state', this.state);
		console.log('articles props', this.props);

		// [0].toUpperCase() + word.substr(1)
		return (
			<div>
				{!this.props.topic ? <h1 className='topic-article-heading'>All Articles</h1> : <h1 className='topic-article-heading'>{this.state.articles[0].topic[0].toUpperCase() + this.state.articles[0].topic.substr(1)}</h1>}

				<section className="main-section">
					{this.state.articles.map((article) => {
						return <ArticleCard key={article.article_id} article={article} />
					})}
				</section>
			</div >
		)
	}
}
