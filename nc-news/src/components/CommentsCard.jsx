import React, { Component } from 'react'
import VoteButton from './VoteButton'
import axios from 'axios'

class CommentsCard extends Component {
	state = {

	}

	handleChange = (event) => {
		// console.log('comments card delete props', this.props);
		const commentId = this.props.comment.comment_id

		axios.delete(`https://nc-news-fe-jonp.herokuapp.com/api/comments/${commentId}`).then((res) => {
			console.log('delete comment', res.data);
			this.props.deleteComments(commentId)
		})
	}

	render() {
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