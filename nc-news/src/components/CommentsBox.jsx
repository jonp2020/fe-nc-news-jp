import axios from 'axios'
import React, { Component } from 'react'

export default class CommentsBox extends Component {
	state = {
		commentsText: '',
	}

	handleChange = (event) => {
		const text = event.target.value
		this.setState((currentState) => {
			return { commentsText: text }
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		let { articleId, username } = this.props;
		if (username.length === 0) username = 'jessjelly'
		axios.post(
			`https://nc-news-fe-jonp.herokuapp.com/api/articles/${articleId}/comments`,
			{
				body: this.state.commentsText,
				username: username,
			})
			.then((res) => {
				this.setState({ commentsText: '' })

				this.props.addComments(res.data)
			}).catch((err) => {
				console.log('err', err);
			})
	}

	render() {
		return (
			<div className="comments-box">
				<textarea value={this.state.commentsText} onChange={this.handleChange}></textarea>
				<button disabled={this.state.commentsText.length === 0} onClick={this.handleSubmit} className="comments-btn">Add Comment</button>
			</div>

		)
	}
}
