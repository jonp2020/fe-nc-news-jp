import React from 'react'
import { Link } from '@reach/router';
import VoteButton from './VoteButton';

const ArticleCard = (props) => {
	const newArticle = { ...props.article }
	const splicedArticleBody = newArticle.body.split(' ').splice(0, 20).join(' ')
	const updatedDate = new Date(newArticle.created_at)
	const updatedTime = newArticle.created_at.slice(11, 16)

	return (
		<article className="article-container">
		{/* <div className="article-container-2"> */}
			<div className='article-container-content'>
			<Link className="article-title" to={`/articles/${newArticle.article_id}`}>
				<h3 className="article-title">{newArticle.title}</h3>
			</Link>
			<p className="article-date-comments">Posted by  <Link className="article-author" to={`/author/${newArticle.author}`}><strong><em>{newArticle.author}</em></strong></Link> on {updatedDate.toDateString()} at {updatedTime}</p>
			<p className="article-body">{splicedArticleBody}...</p>
			<p className="article-date-comments">{newArticle.comment_count} Comments</p>
			<Link className="article-read-more" to={`/articles/${newArticle.article_id}`}>
				<p className="article-read-more">Read more...</p>
			</Link>
			</div>
			<div className="article-card-voteBtn">
			<VoteButton votes={props.article.votes} idNum={props.article.article_id} articlesOrComments="articles" />
			</div>
			{/* </div> */}
		</article>
	)
}


export default ArticleCard

