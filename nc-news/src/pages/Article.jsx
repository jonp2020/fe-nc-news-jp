import React, { Component } from 'react'
import axios from 'axios'
import { Link } from '@reach/router';
import CommentsCard from '../components/CommentsCard'
import VoteButton from '../components/VoteButton'
import CommentsBox from '../components/CommentsBox'
import Pagination from '../components/Pagination'
import ErrorDisplay from '../components/ErrorDisplay'
import LoaderPage from './Loader'

class Article extends Component {
	state = {
		article: {},
		isLoading: true,
		comments: {},
		addedAComment: 0,
		deletedAComment: 0,
		page: 1,
		resultsPerPage: 5,
		error: false
	}

	componentDidMount = () => {
		axios.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/${this.props.article_id}`).then((res) => {
			this.setState({ article: res.data.article })
		}).then(() => {
			axios.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/${this.props.article_id}/comments`).then((res) => {
				this.setState({ comments: res.data.comments, isLoading: false })
			})
		}).catch(({ response }) => {
			this.setState({
				error: {
					status: response.status,
					message: response.data.msg
				}
			})
		})
	}

	componentDidUpdate = (prevProps, prevState) => {
		if (prevState.addedAComment !== this.state.addedAComment || prevState.deletedAComment !== this.state.deletedAComment || prevState.page !== this.state.page) {
			axios.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/${this.props.article_id}`).then((res) => {
				this.setState({ article: res.data.article })
			}).then(() => {
				axios.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/${this.props.article_id}/comments`).then((res) => {
					this.setState({ comments: res.data.comments, isLoading: false })
				})
			}).catch(({ response }) => {
				this.setState({
					error: {
						status: response.status,
						message: response.data.msg
					}
				})
			})
		}
	}

	addComments = (newComment) => {
		this.setState((prevState) => {
			return { comments: [newComment.comment, ...prevState.comments], addedAComment: prevState.addedAComment + 1 }
		})
	}

	deleteComments = (deletedCommentId) => {
		this.setState((prevState) => {
			const updatedComments = prevState.comments.filter((comment) => {
				return comment.comment_id !== deletedCommentId
			})
			return { comments: updatedComments, deletedAComment: prevState.deletedAComment + 1 }
		})
	}

	setPage = (newPage) => {
		this.setState({ page: newPage })
	}

	render() {
		const { error } = this.state
		if (error) return <ErrorDisplay {...error} />
		if (this.state.isLoading) return <LoaderPage />
		const updatedDate = new Date(this.state.article.created_at)
		const updatedTime = this.state.article.created_at.slice(11, 16)
		const indexOfLastComment = this.state.page * this.state.resultsPerPage
		const indexOfFirstComment = indexOfLastComment - this.state.resultsPerPage
		const currentComments = this.state.comments.slice(indexOfFirstComment, indexOfLastComment)

		return (
			<div className="article-and-comments">
				<article className="single-article-container">
					<div className="article-container-content">
						<h3 className="article-title-single">{this.state.article.title}</h3>
						<p className="article-date-comments">Posted by  <Link className="article-author" to={`/author/${this.state.article.author}`}><strong><em>{this.state.article.author}</em></strong></Link> on {updatedDate.toDateString()} at {updatedTime}</p>
						<p className="article-body">{this.state.article.body}</p>
						<p className="article-date-comments">{this.state.article.comment_count} Comments</p>
					</div>
					<div className="article-card-voteBtn">
					<VoteButton votes={this.state.article.votes} idNum={this.state.article.article_id} articlesOrComments="articles" />
					</div>
				</article>

				<div className="comments-box">
				<CommentsBox loggedInStatus={this.props.loggedInStatus} username={this.props.username} articleId={this.state.article.article_id} addComments={this.addComments} />
				</div>
				<div className="comments-section">
					{currentComments.map((comment) => {
						return <CommentsCard username={this.props.username} key={comment.comment_id} comment={comment} deleteComments={this.deleteComments} />
					})}
				</div>
				<Pagination totalPosts={this.state.comments.length} setPage={this.setPage} page={this.state.page} resultsPerPage={this.state.resultsPerPage} />
			</div>
		)
	}
}

export default Article
