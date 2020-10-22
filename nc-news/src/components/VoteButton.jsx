import Axios from 'axios'
import React, { Component } from 'react'
import axios from 'axios'


export default class VoteButton extends Component {
	state = {
		votes: this.props.votes,
		articleId: this.props.articleId
	}

	handleVote = (value) => {
		const updatedVoteCount = this.state.votes + value
		this.setState({ votes: updatedVoteCount })
		axios.patch(`https://nc-news-fe-jonp.herokuapp.com/api/articles/${this.state.articleId}`,
			{ inc_votes: value })
	}



	render() {
		return (
			<div className="article-votes">
				<button onClick={() => { this.handleVote(1) }} className="article-votes-btn" > +</button>
				<p>{this.props.votes}</p>
				<button onClick={() => { this.handleVote(-1) }} className="article-votes-btn">-</button>
			</div >
		)
	}
}


