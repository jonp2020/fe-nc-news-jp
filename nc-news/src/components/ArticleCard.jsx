import React from 'react'
import { Link } from '@reach/router';


const ArticleCard = (props) => {
	// console.log('props ', props.article.title);
	const newArticle = { ...props.article }
	const splicedArticleBody = newArticle.body.split(' ').splice(0, 20).join(' ')
	const updatedDate = new Date(newArticle.created_at)
	const updatedTime = newArticle.created_at.slice(11, 17)
	return (
		<article className='article-card'>
			<Link to={`/articles/${newArticle.article_id}`}>
				<h3 className="article-title">{newArticle.title}</h3>
			</Link>
			<p className="article-body">{splicedArticleBody}...</p>
			<p className="article-date">Posted on: {updatedDate.toDateString()} at {updatedTime}</p>
			<p>{newArticle.comment_count} Comments</p>
			<Link to={`/articles/${newArticle.article_id}`}>
				<p className="article-read-more">Read more...</p>
			</Link>
			<div className="article-votes">
				<p className="article-votes-btn">+</p>
				<p>{props.article.votes}</p>
				<p className="article-votes-btn">-</p>
			</div>
		</article>
	)
}


export default ArticleCard

