import React from 'react'

const ArticleCard = (props) => {
	console.log('props ', props.article.title);
	return (
		<article className='article-card'>
			<h3>{props.article.title}</h3>
			<p>{props.article.body}</p>
			<p>{props.article.created_at}</p>
		</article>
	)
}


export default ArticleCard