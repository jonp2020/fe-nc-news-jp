import React, { Component } from 'react'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'
import Pagination from '../components/Pagination'
import ErrorDisplay from '../components/ErrorDisplay'

class Author extends Component {
	state = {
		articles: [],
		articlesByAuthor: [],
		isLoading: true,
		sort_by: "",
		order: "",
		page: 1,
		resultsPerPage: 5,
		error: false
	}

	componentDidMount = () => {
		console.log('here in articles did mount')
		const { error } = this.state
		const { topic } = this.props
		axios.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/`, {
			params: { topic }
		})
			.then((res) => {
				this.setState({ articles: res.data.articles });
			}).then(() => {
				const { articles } = this.state
				const authorArticles = articles.filter((article) => {
					return article.author === this.props.author
				})
				this.setState({ articlesByAuthor: authorArticles, isLoading: false })
			})
			.catch(({ response }) => {
				console.log('articles did mount err', response)
				this.setState({
					error: {
						status: response.status,
						message: response.data.msg
					}
				})
			})
	}

	componentDidUpdate = (prevProps, prevState) => {
		const { topic } = this.props
		const { sort_by, order, page, error } = this.state
		if (prevProps.topic !== topic || prevState.sort_by !== sort_by || prevState.order !== order || prevState.page !== page) {
			axios
				.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/`, {
					params: { topic, sort_by, order }
				})
				.then((res) => {
					this.setState({ articles: res.data.articles })
				}).then(() => {
					const { articles } = this.state
					const authorArticles = articles.filter((article) => {
						return article.author === this.props.author
					})
					this.setState({ articlesByAuthor: authorArticles, isLoading: false })
				})
				.catch((err) => {
					this.setState({
						error: {
							status: err.status,
							message: err.data.msg
						}
					})
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
	}

	render() {
		const { isLoading, error, articlesByAuthor } = this.state
		const indexOfLastArticle = this.state.page * this.state.resultsPerPage
		const indexOfFirstArticle = indexOfLastArticle - this.state.resultsPerPage
		const currentArticles = articlesByAuthor.slice(indexOfFirstArticle, indexOfLastArticle)
		if (error) return <ErrorDisplay {...error} />
		if (isLoading) return <p>Fetching articles</p>

		return (
			<div>
				<h1 className='topic-article-heading'>Articles posted by <em>{this.props.author}</em></h1> 
				<div className="sortBtn-area">
					<button value="desc" className="sortBtn-btn" onClick={this.sortArticles}>Latest</button>
					<button value="asc" className="sortBtn-btn" onClick={this.sortArticles}>Oldest</button>
					<button value="comment_count" className="sortBtn-btn" onClick={this.sortArticles}>Most commented</button>
					<button value="votes" className="sortBtn-btn" onClick={this.sortArticles}>Most votes</button>

				</div>
				<section className="main-section">

					{currentArticles.map((article) => {
						return <ArticleCard key={article.article_id} article={article} sortArticleByAuthor={this.sortArticlesByAuthor} />
					})}
				</section>
				<Pagination totalPosts={this.state.articlesByAuthor.length} setPage={this.setPage} page={this.state.page} resultsPerPage={this.state.resultsPerPage} />
			</div>
		)
	}

}

export default Author
