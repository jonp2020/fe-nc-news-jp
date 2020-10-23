import axios from 'axios'
import React, { Component } from 'react'

export default class CommentsBox extends Component {
	state = {
		commentsText: '',
	}

	handleChange = (event) => {
		console.log('handlechange comment state', this.state);
		console.log('handlechange comment props', this.props);

		const text = event.target.value
		this.setState((currentState) => {
			return { commentsText: text }
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		console.log('submit btn', event);
		axios.post(`https://nc-news-fe-jonp.herokuapp.com/api/articles/${this.props.articleId}/comments`, {
			body: this.state.commentsText,
			username: this.props.username
		}).then((res) => {
			console.log('commentBox res', res);
		})
	}

	render() {
		return (
			<div className="comments-box">
				<textarea onChange={this.handleChange}></textarea>
				<button onSubmit={this.handleSubmit} className="comments-btn">Add Comment</button>
			</div>

		)
	}
}
