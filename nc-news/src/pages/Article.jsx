import React, { Component } from 'react'
import axios from 'axios'
import CommentsCard from '../components/CommentsCard'
import Navbar from '../components/Navbar'


class Article extends Component {
	state = {
		article: {},
		isLoading: true,
		comments: {}
	}

	componentDidMount = () => {
		const { topic } = this.props
		console.log('article props', this.props);
		axios.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/${this.props.article_id}`).then((res) => {
			this.setState({ article: res.data.article })
		}).then(() => {
			axios.get(`https://nc-news-fe-jonp.herokuapp.com/api/articles/${this.props.article_id}/comments`).then((res) => {
				this.setState({ comments: res.data.comments, isLoading: false })
			})
		}).catch((err) => {
			return err
		})
	}

	render() {
		if (this.state.isLoading) return <p>Getting you the article</p>
		const updatedDate = new Date(this.state.article.created_at)
		const updatedTime = this.state.article.created_at.slice(11, 16)
		console.log('single article props', this.props);
		return (
			<div>
				<article className='article-card'>
					<h3 className="article-title">{this.state.article.title}</h3>
					<p className="article-date">Posted by {this.state.article.author} on {updatedDate.toDateString()} at {updatedTime}</p>
					<p className="article-body">{this.state.article.body}</p>
					<p>{this.state.article.comment_count} Comments</p>

					<div className="article-votes">
						<button className="article-votes-btn">+</button>
						<p>{this.state.article.votes}</p>
						<button className="article-votes-btn">-</button>
					</div>
					<button>Add Comment</button>
				</article>
				<div className="comments-section">
					{this.state.comments.map((comment) => {
						return <CommentsCard key={comment.comment_id} comment={comment} />
					})}

				</div>
			</div>

		)
	}
}

export default Article
