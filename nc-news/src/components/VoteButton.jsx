import React, { Component } from 'react'
import axios from 'axios'


export default class VoteButton extends Component {
	state = {
		voteCount: 0
	}

	handleVote = (voteValue) => {
		this.setState((currentState) => {
			return { voteCount: currentState.voteCount + voteValue }
		})
		const { articleId } = this.props
		console.log(articleId, 'articleId');
		console.log('current state', this.state);


		axios.patch(`https://nc-news-fe-jonp.herokuapp.com/api/articles/${articleId}`,
			{ inc_votes: voteValue }).catch((err) => {
				this.setState((currentState) => {
					return { voteCount: currentState.voteCount - voteValue }
				})
			})
	}

	render() {
		return (
			<div className="article-votes" >
				<button onClick={() => { this.handleVote(1) }} className="article-votes-btn" >+</button>
				<p>{this.props.votes + this.state.voteCount}</p>
				<button onClick={() => { this.handleVote(-1) }} value={-1} className="article-votes-btn">-</button>
			</div>
		)
	}
}


