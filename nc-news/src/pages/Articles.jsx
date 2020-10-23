import React, { Component } from 'react'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'
// import Navbar from '../components/Navbar'

export default class Articles extends Component {
	state = {
		articles: [],
		articlesToDisplay: '',
		isLoading: true,
		sortBy: ""
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
		const { sortBy } = this.state
		if (prevState.articlesToDisplay !== this.state.articlesToDisplay || prevProps.topic !== this.props.topic || prevState.sortBy !== this.state.sortBy) {
			console.log('here in mount update');
			axios
				.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/`, {
					params: { topic, articlesToDisplay, sortBy }
				})
				.then((res) => {
					this.setState({ articles: res.data.articles })
				})
		}
	}

	sortArticles = (event) => {
		event.preventDefault()
		const sortByValue = event.target.value;
		this.setState({ sortBy: sortByValue })
	}

	render() {
		console.log('articles state', this.state);
		if (this.state.isLoading) return <p>Fetching articles</p>
		return (
			<div>
				{!this.props.topic ? <h1 className='topic-article-heading'>All Articles</h1> : <h1 className='topic-article-heading'>{this.state.articles[0].topic[0].toUpperCase() + this.state.articles[0].topic.substr(1)}</h1>}
				<div className="sortBtn-area">
					<button value="sort_by=created_at?order=asc" className="sortBtn-btn" onClick={this.sortArticles}>Latest</button>
					<button value="sort_by=created_at?order=desc" className="sortBtn-btn" onClick={this.sortArticles}>Oldest</button>
					<button value="sort_by=comment_count" className="sortBtn-btn" onClick={this.sortArticles}>Most commented</button>
					<button value="sort_by=votes" className="sortBtn-btn" onClick={this.sortArticles}>Most votes</button>

				</div>
				<section className="main-section">
					{this.state.articles.map((article) => {
						return <ArticleCard key={article.article_id} article={article} />
					})}
				</section>
			</div>
		)
	}
}
