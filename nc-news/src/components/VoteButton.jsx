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

		const { articlesOrComments, idNum } = this.props

		axios.patch(`https://nc-news-fe-jonp.herokuapp.com/api/${articlesOrComments}/${idNum}`,
			{ inc_votes: voteValue }).catch((err) => {
				console.log('votes patch err', err);
				this.setState((currentState) => {
					return { voteCount: currentState.voteCount - voteValue }
				})
			})
	}

	render() {
		return (
			<div className="article-votes" >
				<button disabled={this.state.voteCount === 1} onClick={() => { this.handleVote(1) }} className="article-votes-btn" >+</button>
				<p>{this.props.votes + this.state.voteCount}</p>
				<button disabled={this.state.voteCount === -1} onClick={() => { this.handleVote(-1) }} value={-1} className="article-votes-btn">-</button>
			</div>
		)
	}
}


