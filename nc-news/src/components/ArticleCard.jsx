import React from 'react'
import { Link } from '@reach/router';


const ArticleCard = (props) => {
	// console.log('props ', props);
	const newArticle = { ...props.article }
	const splicedArticleBody = newArticle.body.split(' ').splice(0, 20).join(' ')
	const updatedDate = new Date(newArticle.created_at)
	const updatedTime = newArticle.created_at.slice(11, 16)

	return (
		<article className='article-card'>
			<Link to={`/articles/${newArticle.article_id}`}>
				<h3 className="article-title">{newArticle.title}</h3>
			</Link>
			<p className="article-date">Posted by {newArticle.author} on {updatedDate.toDateString()} at {updatedTime}</p>
			<p className="article-body">{splicedArticleBody}...</p>
			<p>{newArticle.comment_count} Comments</p>
			<Link to={`/articles/${newArticle.article_id}`}>
				<p className="article-read-more">Read more...</p>
			</Link>
			<div className="article-votes">
				<button className="article-votes-btn">+</button>
				<p>{props.article.votes}</p>
				<button className="article-votes-btn">-</button>
			</div>
		</article>
	)
}


export default ArticleCard
