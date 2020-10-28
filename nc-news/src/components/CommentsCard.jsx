import React, { Component } from 'react'
import VoteButton from './VoteButton'
import axios from 'axios'
import ErrorDisplay from '../components/ErrorDisplay'


class CommentsCard extends Component {

	state = {
		error: false
	} 

	handleChange = (event) => {
		const commentId = this.props.comment.comment_id

		axios.delete(`https://nc-news-fe-jonp.herokuapp.com/api/comments/${commentId}`).then((res) => {
			this.props.deleteComments(commentId)
		}).catch((response) => {
			console.log('delete comment response', response);
			console.log('delete comment response status', response.status);
			console.log('delete comment response data', response.data);


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
		const updatedTime = newComment.created_at.slice(11, 1)
		return (
			<div className="comments-body">
				<p>{this.props.comment.body}</p>
				<p>Posted on {updatedDate.toDateString()} at {updatedTime} by {this.props.comment.author}</p>
				<VoteButton votes={this.props.comment.votes} idNum={this.props.comment.comment_id} articlesOrComments="comments" />

				{this.props.username === this.props.comment.author ?
					<button onClick={this.handleChange}
						className="comments-btn">Delete comment</button> : null
				}
			</div>
		)
	}

}

export default CommentsCard; 