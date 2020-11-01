import React, { Component } from 'react'
import VoteButton from './VoteButton'
import axios from 'axios'
import { Link } from '@reach/router';

class CommentsCard extends Component {
	state = {
		error: false
	} 

	handleChange = (event) => {
		const commentId = this.props.comment.comment_id
		axios.delete(`https://nc-news-fe-jonp.herokuapp.com/api/comments/${commentId}`).then((res) => {
			this.props.deleteComments(commentId)
		}).catch((response) => {
			this.setState({
				error: {
					status: 404,
					message: 'There has been a problem processing your request. Please refresh the page and try again.',
				}
			})
		})
	}

	render() {
		const {error} = this.state
		if (error) {return (
			<div>
				<h4>{this.state.error.message}</h4>
				<h5>Status: {this.state.error.status}</h5>
			</div>
		)}
		const newComment = { ...this.props.comment }
		const updatedDate = new Date(newComment.created_at)
		const updatedTime = newComment.created_at.slice(11, 16)
		return (
			<div className="comments-body-container">
				<div className="comment-content">
					<p className="comment-body">{this.props.comment.body}</p>
					<p className="article-date-comments">Posted by  <Link className="article-author" to={`/author/${this.props.comment.author}`}><strong><em>{this.props.comment.author}</em></strong></Link> on {updatedDate.toDateString()} at {updatedTime}</p>
					{this.props.username === this.props.comment.author ?
					<button onClick={this.handleChange}
						className="comments-btn">Delete comment</button> : null
					}
				</div>
				<div className="comment-vote-btn">
					<VoteButton votes={this.props.comment.votes} idNum={this.props.comment.comment_id} articlesOrComments="comments" />
					</div>
			</div>
		)
	}
}

export default CommentsCard; 