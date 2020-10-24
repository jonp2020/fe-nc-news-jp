import React, { Component } from 'react'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'
// import Navbar from '../components/Navbar'

export default class Articles extends Component {
	state = {
		articles: [],
		isLoading: true,
		sort_by: "",
		order: "",
		page: 1
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

	componentDidUpdate = (prevProps, prevState) => {
		const { topic } = this.props
		const { sort_by, order } = this.state
		if (prevProps.topic !== this.props.topic || prevState.sort_by !== this.state.sort_by || prevState.order !== this.state.order) {
			axios
				.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/`, {
					params: { topic, sort_by, order }
				})
				.then((res) => {
					this.setState({ articles: res.data.articles })
				})
		}
	}

	sortArticles = (event) => {
		if (event.target.value === "votes" || event.target.value === 'comment_count') {
			const sortByValue = event.target.value;
			this.setState({ sort_by: sortByValue, order: "" })
		} else {
			const sortByValue = event.target.value;
			this.setState({ order: sortByValue, sort_by: "" })
		}
	}

	setPage = (newPage) => {
		this.setState({ page: newPage })
		console.log(this.state.page);

	}

	render() {
		console.log('rendering in many articles');
		if (this.state.isLoading) return <p>Fetching articles</p>
		return (
			<div>
				{!this.props.topic ? <h1 className='topic-article-heading'>All Articles</h1> : <h1 className='topic-article-heading'>{this.state.articles[0].topic[0].toUpperCase() + this.state.articles[0].topic.substr(1)}</h1>}
				<div className="sortBtn-area">
					<button value="desc" className="sortBtn-btn" onClick={this.sortArticles}>Latest</button>
					<button value="asc" className="sortBtn-btn" onClick={this.sortArticles}>Oldest</button>
					<button value="comment_count" className="sortBtn-btn" onClick={this.sortArticles}>Most commented</button>
					<button value="votes" className="sortBtn-btn" onClick={this.sortArticles}>Most votes</button>

				</div>
				<section className="main-section">
					{this.state.articles.map((article) => {
						return <ArticleCard key={article.article_id} article={article} />
					})}
				</section>
				<section className="pagination-container">
					<button className="paginate-btn" onClick={() => this.setPage(this.state.page - 1)}>{'<'}</button>
					<button className="paginate-btn">Page {this.state.page}</button>
					<button className="paginate-btn" onClick={() => this.setPage(this.state.page + 1)}> {'>'}</button>
				</section>
			</div>
		)
	}
}
