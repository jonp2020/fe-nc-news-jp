import React, { Component } from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ArticleCard from '../components/ArticleCard'
import Pagination from '../components/Pagination'
import ErrorDisplay from '../components/ErrorDisplay'
import LoaderPage from './Loader'

const styles = theme => ({
	sortArticlesBtn: {
				margin: theme.spacing(1),
	},
});

class Articles extends Component {

	state = {
		articles: [],
		isLoading: true,
		sort_by: "",
		order: "",
		page: 1,
		resultsPerPage: 5,
		colorOn: 'blue',
		colorOff: 'yellow',
		error: false
	}

	componentDidMount = () => {
		const { topic } = this.props
		axios.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/`, {
			params: { topic }
		})
			.then((res) => {
				this.setState({ articles: res.data.articles, isLoading: false });
			})
			.catch(({ response }) => {
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
		const { sort_by, order, page } = this.state
		if (prevProps.topic !== topic || prevState.sort_by !== sort_by || prevState.order !== order || prevState.page !== page) {
			axios
				.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/`, {
					params: { topic, sort_by, order }
				})
				.then((res) => {
					this.setState({ articles: res.data.articles })
				})
				.catch((response) => {
					this.setState({
						error: {
							status: response.status,
							message: response.data.msg
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
		this.setBtnColor(event.target.value)
	}

	setBtnColor = (passedValue) => {
		const btnElements = document.getElementsByClassName('sortBtn-btn')
		for (let i = 0; i < btnElements.length; i++) {
			if(btnElements[i].value === passedValue){
				btnElements[i].classList.add("sortBtn-btn-selected")
			} else btnElements[i].classList.remove("sortBtn-btn-selected")
		}
	}

	setPage = (newPage) => {
		this.setState({ page: newPage })
		window.scrollTo(0, 0)
	}

	render() {
		const { isLoading, error } = this.state
		const indexOfLastArticle = this.state.page * this.state.resultsPerPage
		const indexOfFirstArticle = indexOfLastArticle - this.state.resultsPerPage
		const currentArticles = this.state.articles.slice(indexOfFirstArticle, indexOfLastArticle)
		if (error) return <ErrorDisplay {...error} />
		if (isLoading) return <LoaderPage />
	
		return (
			<div className="articles-container">
				{!this.props.topic ? <h1 className='topic-article-heading'>All Articles</h1> : <h1 className='topic-article-heading'>{this.state.articles[0].topic[0].toUpperCase() + this.state.articles[0].topic.substr(1)}</h1>}
				<Pagination totalPosts={this.state.articles.length} setPage={this.setPage} page={this.state.page} resultsPerPage={this.state.resultsPerPage} />

				<div className="sortBtn-container">
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
				<Pagination totalPosts={this.state.articles.length} setPage={this.setPage} page={this.state.page} resultsPerPage={this.state.resultsPerPage} />
			</div>
		)
	}
}


Articles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Articles);

