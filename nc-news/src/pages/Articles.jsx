import React, { Component } from 'react'
import axios from 'axios'
import { withStyles, withTheme } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ArticleCard from '../components/ArticleCard'
import Pagination from '../components/Pagination'
import ErrorDisplay from '../components/ErrorDisplay'
// import Navbar from '../components/Navbar'

const styles = theme => ({
  root: {
		// margin: theme.spacing(10,10),
    // padding: theme.spacing(10, 3),
	},
	// sortBtnArea: {
	// 	margin: theme.spacing(1),
  //   padding: theme.spacing(2, 3),
	// 	color: 'white'
	// },
	sortArticlesBtn: {
				margin: theme.spacing(1),


	},
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#083d77',
    },
    secondary: {
      main: '#f44336',
    },
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
		error: false
	}

	componentDidMount = () => {
		const { error } = this.state
		const { topic } = this.props
		axios.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/`, {
			params: { topic }
		})
			.then((res) => {
				this.setState({ articles: res.data.articles, isLoading: false });
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

		// this.setState({ isLoading: true })
		const { topic } = this.props
		const { sort_by, order, page, error } = this.state
		if (prevProps.topic !== topic || prevState.sort_by !== sort_by || prevState.order !== order || prevState.page !== page) {
			axios
				.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/`, {
					params: { topic, sort_by, order }
				})
				.then((res) => {
					this.setState({ articles: res.data.articles })
				})
				.catch((response) => {
					console.log('articles did update err', response);
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
	}

	setPage = (newPage) => {
		this.setState({ page: newPage })
	}

	render() {
		const { classes } = this.props;

		const { isLoading, error } = this.state
		const indexOfLastArticle = this.state.page * this.state.resultsPerPage
		const indexOfFirstArticle = indexOfLastArticle - this.state.resultsPerPage
		const currentArticles = this.state.articles.slice(indexOfFirstArticle, indexOfLastArticle)
		console.log('render articles err', error)
		if (error) return <ErrorDisplay {...error} />
		if (isLoading) return <CircularProgress />

		// <p>Fetching articles</p>

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

