import React from 'react'
import VoteButton from './VoteButton'

const CommentsCard = (props) => {
	const newComment = { ...props.comment }
	const updatedDate = new Date(newComment.created_at)
	const updatedTime = newComment.created_at.slice(11, 1)
	return (
		<div className="comments-body">
			<p>{props.comment.body}</p>
			<p>Posted on {updatedDate.toDateString()} at {updatedTime} by {props.comment.author}</p>
			<VoteButton votes={props.comment.votes} idNum={props.comment.comment_id} articlesOrComments="comments" />

		</div>
	)
}

export default CommentsCard; 