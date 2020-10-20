import React from 'react'

const CommentsCard = (props) => {
	// console.log('comment props', props);
	const newComment = { ...props.comment }
	const updatedDate = new Date(newComment.created_at)
	const updatedTime = newComment.created_at.slice(11, 1)
	return (
		<div className="comments-body">
			<p>{props.comment.body}</p>
			<p>Posted on {updatedDate.toDateString()} at {updatedTime} by {props.comment.author}</p>

		</div>
	)
}

export default CommentsCard;